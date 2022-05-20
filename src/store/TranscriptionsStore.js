import { detach, flow, getRoot, getSnapshot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import * as Ramda from 'ramda'
import { undoManager } from 'store/AppStore'
import apiClient from 'panoptes-client/lib/api-client.js'
import { reaction, toJS } from 'mobx'
import { request } from 'graphql-request'
import { config } from 'config'

import { constructText, mapExtractsToReductions } from 'helpers/parseTranscriptionData'
import { getPage, getSlopeLabel, isolateGroups, lastInstanceOnPage } from 'helpers/slopeHelpers'
import getError, { TranscriptionError } from 'helpers/getError'
import MODALS from 'helpers/modals'
import STATUS from 'helpers/status'

import Reduction from './Reduction'

let Frame = types.array(Reduction)
const Extension = types.refinement(types.map(Frame), snapshot => {
  return Ramda.all(Ramda.startsWith('frame'), Ramda.keys(snapshot))
})

const MIN_TIME_BETWEEN_PATCH = 3000

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flagged: types.optional(types.boolean, false),
  frame_order: types.array(types.string),
  group_id: types.optional(types.string, ''),
  internal_id: types.optional(types.string, ''),
  last_modified: types.optional(types.string, ''),
  low_consensus_lines: types.optional(types.integer, 0),
  locked_by: types.maybeNull(types.string),
  pages: types.optional(types.integer, 0),
  parameters: types.optional(types.frozen()),
  reducer: types.maybeNull(types.string),
  status: types.optional(types.string, ''),
  text: Extension,
  transcribed_lines: types.optional(types.number, 0),
  updated_at: types.optional(types.string, ''),
  updated_by: types.optional(types.string, '')
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  activeTranscriptionIndex: types.maybe(types.integer),
  all: types.map(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Transcription),
  error: types.maybeNull(TranscriptionError),
  index: types.optional(types.number, 0),
  extractUsers: types.optional(types.frozen()),
  page: types.optional(types.number, 0),
  patchQueue: types.array(types.frozen()),
  showSaveTranscriptionError: types.optional(types.boolean, false),
  slopeIndex: types.optional(types.number, 0),
  slopeDefinitions: types.optional(types.frozen(), {}),
  slopeKeys: types.array(types.string),
  totalPages: types.optional(types.number, 1),
  approvedCount: types.optional(types.number, 1),
  totalCount: types.optional(types.number, 1),
  rawExtracts: types.array(types.frozen()),
  parsedExtracts: types.array(types.frozen())
}).actions(self => {
  function arrangeExtractsByUser() {
    return self.rawExtracts.reduce((list, extract) => {
      if (!list[extract.user_id]) list[extract.user_id] = []
      list[extract.user_id].push({ ...extract.data, time: extract.time })
      return list
    }, {})
  }

  function afterAttach() {
    reaction(() => self.asyncState, (state) => {
      if (state === ASYNC_STATES.ERROR) {
        undoManager.withoutUndo(() => self.showSaveTranscriptionError = true)
      } else if (state === ASYNC_STATES.READY) {
        undoManager.withoutUndo(() => self.showSaveTranscriptionError = false)
      }
    })
  }

  function addLine(index) {
    const page = self.current.text.get(self.currentKey)
    if (!page) return
    const location = index ? index : page.length
    const newLine = Reduction.create({ slope_label: self.slopeIndex })
    page.splice(location, 0, newLine)
    self.setActiveTranscription(location)
    self.setParsedExtracts()
  }

  function changeIndex(index, slopeIndex) {
    self.index = index
    self.slopeIndex = slopeIndex
    self.setParsedExtracts()
  }

  function checkForFlagUpdate() {
    let containsLineFlag = false
    self.current.text.forEach(t => {
      const flaggedItem = t.find(t => t.flagged)
      if (flaggedItem) containsLineFlag = true
    })
    self.current.flagged = containsLineFlag
    self.saveTranscription()
  }

  const checkIfLocked = flow(function * checkIfLocked() {
    const { client } = getRoot(self)
    const response = yield client.get(`/transcriptions/${self.title}`)
    const resource = JSON.parse(response.body)
    const lockedBy = resource.data.attributes.locked_by
    const lockedByDifferentUser = lockedBy && lockedBy !== getRoot(self).auth.user.login
    if (lockedByDifferentUser) {
      self.current.lockedBy = lockedBy
      getRoot(self).modal.toggleModal(MODALS.LOCKED)
    }
  })

  function createTranscription(transcription, last_modified = '') {
    const text = (transcription.attributes && transcription.attributes.text) || {}
    const containsFrameKey = (val, key) => key.indexOf('frame') >= 0
    const textObject = Ramda.pickBy(containsFrameKey, text)
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      frame_order: transcription.attributes.frame_order,
      group_id: transcription.attributes.group_id,
      last_modified,
      internal_id: transcription.attributes.internal_id || '',
      locked_by: transcription.attributes.locked_by,
      low_consensus_lines: transcription.attributes.low_consensus_lines || 0,
      pages: transcription.attributes.total_pages || 0,
      parameters: transcription.attributes.parameters,
      reducer: transcription.attributes.reducer,
      status: transcription.attributes.status,
      text: textObject,
      transcribed_lines: transcription.attributes.total_lines || 0,
      updated_at: transcription.attributes.updated_at || '',
      updated_by: transcription.attributes.updated_by || ''
    })
  }

  function deleteCurrentLine() {
    if (Number.isInteger(self.activeTranscriptionIndex)) {
      const page = self.current.text.get(self.currentKey)
      page.splice(self.activeTranscriptionIndex, 1)
      self.getSlopeKeys()
      self.saveTranscription()
      self.setActiveTranscription()
    }
  }

  function chooseNewActivePage() {
    const newKey = self.slopeKeys.find(key => getSlopeLabel(key) !== self.slopeIndex)
    self.index = getPage(newKey)
    self.slopeIndex = getSlopeLabel(newKey)
  }

  function deletePage() {
    let page = self.current.text.get(self.currentKey)
    page = page.filter(line => line.slope_label !== self.slopeIndex)

    const lastTranscriptionsOnPage = lastInstanceOnPage(self.slopeKeys, self.index)

    if (page.length || lastTranscriptionsOnPage) {
      self.current.text.set(self.currentKey, page)
    } else {
      if (self.current.frame_order.length) {
        self.current.frame_order = self.current.frame_order.filter(frame => frame !== self.currentKey)
      }
      self.current.text.forEach((value, key) => {
        if (key === self.currentKey) detach(value)
      })
    }
    self.getSlopeKeys()
    if (!lastTranscriptionsOnPage) self.chooseNewActivePage()
    self.saveTranscription()
  }

  const reaggregateDBScan = flow(function * reaggregateDBScan(params) {
    undoManager.withoutUndo(() => getRoot(self).modal.toggleModal(MODALS.LOADING))
    const client = getRoot(self).client.aggregator
    const query = `?eps_slope=${params.epsSlope}&eps_line=${params.epsLine}&eps_word=${params.epsWord}&gutter_tol=${params.gutterTol}&min_samples=${params.minSamples}&min_word_count=${params.minWordCount}`
    try {
      yield client.post(`/poly_line_text_reducer${query}`, { body: toJS(self.rawExtracts) }).then((response) => {
        self.redefineTranscription(response.body)
      })
    } catch (err) {
      undoManager.withoutUndo(() => {
        self.error = getError(err)
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
    undoManager.withoutUndo(() => getRoot(self).modal.toggleModal(''))
  })

  const reaggregateOptics = flow(function * reaggregateOptics(params) {
    undoManager.withoutUndo(() => getRoot(self).modal.toggleModal(MODALS.LOADING))
    const client = getRoot(self).client.aggregator
    const minSamples = params.auto ? 'auto' : params.minSamples
    const query = `?min_samples=${minSamples}&xi=${params.xi}&angle_eps=${params.angleEps}&gutter_eps=${params.gutterEps}&min_line_length=${params.minLineLength}`
    try {
      yield client.post(`/optics_line_text_reducer${query}`, { body: toJS(self.rawExtracts) }).then((response) => {
        self.redefineTranscription(response.body)
      })
    } catch (err) {
      undoManager.withoutUndo(() => {
        self.error = getError(err)
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
    undoManager.withoutUndo(() => getRoot(self).modal.toggleModal(''))
  })

  function redefineTranscription(reduction) {
    const textObject = {}
    Object.keys(reduction).forEach((key) => {
      if (key.includes('frame')) {
        textObject[key] = reduction[key]
      }
    })
    self.current.text.forEach((value, key) => {
      if (!textObject[key]) detach(value)
    })
    self.current.frame_order = []
    self.index = 0
    self.slopeIndex = 0
    self.current.low_consensus_lines = reduction.low_consensus_lines
    self.current.parameters = reduction.parameters
    self.current.reducer = reduction.reducer
    self.current.text = textObject
    self.current.transcribed_lines = reduction.transcribed_lines
    self.saveTranscription()
    self.getSlopeKeys()
  }

  const fetchExtracts = flow(function * fetchExtracts(id) {
    const workflowId = getRoot(self).workflows.current.id
    // TODO: The extractor key below will need to change eventually. This is just
    // to test the code with ASM staging data. In the future, this will change to
    // 'alice' once current extractors have been backfilled with duplicate extractors
    // with the correct 'alice' key.
    const query = `{
      workflow(id: ${workflowId}) {
        extracts(subjectId: ${id}, extractorKey: "alice") {
          data, userId, classificationAt
        }
      }
    }`
    let validExtracts = []
    yield request(config.caesar, query).then((data) => {
      const filteredExtracts = data.workflow.extracts.filter(extract => Object.entries(extract.data).length > 0)
      validExtracts = filteredExtracts.map((extract) => {
        return { data: extract.data, user_id: extract.userId, time: extract.classificationAt }
      })
    })
    undoManager.withoutUndo(() => self.rawExtracts = validExtracts)
    const arrangedExtractsByUser = self.arrangeExtractsByUser()
    yield self.getTranscriberInfo(arrangedExtractsByUser)
    self.setParsedExtracts(arrangedExtractsByUser, false)
  })

  const fetchTranscriptions = function * fetchTranscriptions(page = 0, shouldReset = true) {
    if (shouldReset) self.reset()
    self.page = page
    const groupName = getRoot(self).groups.title
    const workflow = getRoot(self).workflows.current.id
    if (!groupName || !workflow) return
    const searchQuery = getRoot(self).search.getSearchQuery()
    const sortQuery = getRoot(self).search.getSortQuery()
    yield self.retrieveTranscriptions(`/transcriptions?filter[group_id_eq]=${groupName}&filter[workflow_id_eq]=${workflow}&page[number]=${self.page + 1}${searchQuery}${sortQuery}`)
  }

  function getLastModified(response) {
    let lastModified = ''
    if (response.headers) {
      response.headers.forEach((val, key) => {
        if (key === 'last-modified') lastModified = val
      })
    }
    return lastModified
  }

  function getSlopeKeys(commitToHistory = true) {
    const allSlopeKeys = []
    const slopeDefinitions = {}
    const framesWithoutTranscriptions = []

    let frames = self.current.frame_order.length ? self.current.frame_order : Array.from(self.current.text.keys())

    frames.forEach(key => {
      const frame = self.current.text.get(key)

      if (!frame.length) framesWithoutTranscriptions.push(key)

      frame.forEach(r => {
        const slopeKey = key.includes('.') ? key : `${key}.${r.slope_label}`
        if (!allSlopeKeys.includes(slopeKey)) {
          allSlopeKeys.push(slopeKey)
        }
        if (!slopeDefinitions[slopeKey]) {
          slopeDefinitions[slopeKey] = r.line_slope
        }
      })
    })

    framesWithoutTranscriptions.forEach(emptyFrame => {
      const emptyFramePage = getPage(emptyFrame)
      const pageExistsInSlopeKeys = allSlopeKeys.some(key => getPage(key) === emptyFramePage)
      if (!pageExistsInSlopeKeys) {
        const slopeKey = `frame${emptyFramePage}.0`
        allSlopeKeys.push(slopeKey)
        slopeDefinitions[slopeKey] = 0
      }
    })

    if (commitToHistory) {
      self.slopeKeys = allSlopeKeys
      self.slopeDefinitions = slopeDefinitions
    } else {
      undoManager.withoutUndo(() => {
        self.slopeKeys = allSlopeKeys
        self.slopeDefinitions = slopeDefinitions
      })
    }
  }

  const getTranscriberInfo = flow(function * getTranscriberInfo(arrangedExtractsByUser) {
    let usersWhoClassified = Object.keys(arrangedExtractsByUser)
    usersWhoClassified = usersWhoClassified.filter(user => user !== 'null')
    const users = yield apiClient.type('users').get({ id: usersWhoClassified })
    undoManager.withoutUndo(() => {
      self.extractUsers = users.reduce((list, user) => {
        list[user.id] = user.display_name
        return list
      }, {})
    })
  })

  function saveMostRecentPatch() {
    const mostRecentPatch = self.patchQueue.pop()
    if (mostRecentPatch) self.patchTranscription(mostRecentPatch)
    self.patchQueue = []
  }

  function enqueuePatch(query) {
    self.asyncState = ASYNC_STATES.LOADING
    if (self.patchQueue.length === 0) {
      setTimeout(() => self.saveMostRecentPatch(), MIN_TIME_BETWEEN_PATCH)
    }
    self.patchQueue.push(query)
  }

  const patchTranscription = flow(function * patchTranscription(query) {
    const { client } = getRoot(self)
    try {
      const responseStream = yield client.patch(`/transcriptions/${self.current.id}`, { body: query, headers: { 'If-Unmodified-Since': self.current.last_modified } }).then(response => {
        if (response.ok) {
          return response
        } else {
          return Promise.reject(response)
        }
      })
      undoManager.withoutUndo(() => {
        self.current.last_modified = getLastModified(responseStream)
        self.error = null
        self.asyncState = ASYNC_STATES.READY
      })
    } catch (err) {
      undoManager.withoutUndo(() => {
        self.error = getError(err)
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
  })

  function rearrangePages(keys) {
    self.slopeKeys = keys
    const groupedKeys = isolateGroups(keys)
    const rearrangedText = {}
    groupedKeys.forEach(group => {
      group.forEach((key, index) => {
        const page = getPage(key)
        const slopeLabel = getSlopeLabel(key)
        const isNewKey = !rearrangedText[`frame${page}`]
        const firstItemInGroup = index === 0
        const reductions = self.current.text.get(key) || self.current.text.get(`frame${page}`)

        if (isNewKey && firstItemInGroup) {
          rearrangedText[`frame${page}`] = []
        } else if (!isNewKey && firstItemInGroup) {
          rearrangedText[key] = []
        }
        reductions.forEach(reduction => {
          if (reduction.slope_label === slopeLabel) {
            const lastKey = Object.keys(rearrangedText)[Object.keys(rearrangedText).length - 1]
            rearrangedText[lastKey].push(reduction)
            detach(reduction)
          }
        })
      })
    })
    self.current.frame_order = Object.keys(rearrangedText)
    self.current.text = rearrangedText
    self.saveTranscription()
  }

  function reset() {
    getRoot(self).aggregations.setModal(false)
    self.current = undefined
    self.index = 0
    self.slopeIndex = 0
    self.all.clear()
  }

  const retrieveTranscriptions = flow(function * retrieveTranscriptions(query) {
    const { client } = getRoot(self)
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    try {
      const response = yield client.get(query)
      const resources = JSON.parse(response.body)
      undoManager.withoutUndo(() => {
        resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      })
      undoManager.withoutUndo(() => {
        self.totalPages = resources.meta.pagination.last || resources.meta.pagination.current
        self.approvedCount = resources.meta.approved_count
        self.totalCount = resources.meta.pagination.records
        self.asyncState = ASYNC_STATES.READY
      })
    } catch (error) {
      console.warn(error);
      undoManager.withoutUndo(() => {
        self.error = TranscriptionError.create({ message: error.message })
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
  })

  function saveTranscription() {
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    const frame_order = toJS(self.current.frame_order)
    const textBlob = toJS(self.current.text)
    const additionalData = {
      low_consensus_lines: self.current.low_consensus_lines,
      transcribed_lines: self.current.transcribed_lines
    }
    const updatedTranscription = Object.assign(additionalData, textBlob)
    const query = {
      data: {
        type: 'transcriptions',
        attributes: {
          flagged: self.current.flagged,
          frame_order,
          status: self.current.status,
          text: updatedTranscription
        }
      }
    }
    if (self.current.reducer && self.current.reducer.length) {
      query.data.attributes.reducer = self.current.reducer
      query.data.attributes.parameters = self.current.parameters
    }
    self.enqueuePatch(query)
  }

  const selectTranscription = flow(function * selectTranscription(id = null) {
    if (!id) return undefined
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    const { client } = getRoot(self)
    try {
      const response = yield client.get(`/transcriptions/${id}`)
      const lastModified = getLastModified(response)
      const resource = JSON.parse(response.body)
      const transcription = self.createTranscription(resource.data, lastModified)
      self.setTranscription(transcription)
      undoManager.withoutUndo(() => {
        self.current = id
        self.asyncState = ASYNC_STATES.READY
      })
      yield self.fetchExtracts(id)
      self.getSlopeKeys(false)
    } catch (error) {
      console.warn(error);
      undoManager.withoutUndo(() => {
        self.error = TranscriptionError.create({ message: error.message })
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
  })

  function setActiveTranscription(id) {
    self.activeTranscriptionIndex = id
  }

  function setParsedExtracts(arrangedExtractsByUser, commitToHistory = true) {
    const extracts = []
    const extractsByUser = arrangedExtractsByUser || self.arrangeExtractsByUser()
    const reductionText = self.currentTranscriptions
      && self.currentTranscriptions.map(transcription => constructText(transcription))
    self.currentTranscriptions && self.currentTranscriptions.forEach((reduction, reductionIndex) => {
      extracts.push(mapExtractsToReductions(extractsByUser, reduction, reductionIndex, reductionText, self.index, self.extractUsers))
    })
    if (commitToHistory) {
      self.parsedExtracts = extracts
    } else {
      undoManager.withoutUndo(() => self.parsedExtracts = extracts)
    }
  }

  function setTextObject(newState) {
    if (!Ramda.equals(self.currentTranscriptions, newState)) {
      self.current.text.set(self.currentKey, newState)
      self.setParsedExtracts()
      self.saveTranscription()
    }
  }

  function setTranscription(transcription) {
    if (transcription) {
      try {
        self.all.put(transcription)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  function toggleError() {
    self.showSaveTranscriptionError = !self.showSaveTranscriptionError
  }

  function undo() {
    const prevSnapshot = getSnapshot(self)
    const prevTranscription = prevSnapshot.all[prevSnapshot.current]

    undoManager.canUndo && undoManager.undo()

    const nextSnapshot = getSnapshot(self)
    const nextTranscription = nextSnapshot.all[nextSnapshot.current]

    if (prevTranscription !== nextTranscription) {
      self.saveTranscription()
    }
  }

  const unlockTranscription = flow(function * unlockTranscription() {
    if (self.lockedByCurrentUser) {
      const { client } = getRoot(self)
      yield client.patch(`/transcriptions/${self.current.id}/unlock`, { headers: { 'If-Unmodified-Since': self.current.last_modified } })
    }
  })

  function updateApproval(isChecked) {
    self.setActiveTranscription()
    const isAdmin = getRoot(self).projects.isAdmin
    let status = STATUS.IN_PROGRESS
    if (!isChecked) {
      status = isAdmin ? STATUS.APPROVED : STATUS.READY
    }
    self.current.status = status
    self.saveTranscription()
  }

  return {
    afterAttach,
    arrangeExtractsByUser,
    addLine,
    changeIndex,
    checkForFlagUpdate,
    checkIfLocked,
    chooseNewActivePage,
    createTranscription: (transcription, lastModified) => undoManager.withoutUndo(() => createTranscription(transcription, lastModified)),
    deleteCurrentLine,
    deletePage,
    enqueuePatch,
    fetchExtracts,
    fetchTranscriptions: (page, shouldReset) => undoManager.withoutUndo(() => flow(fetchTranscriptions))(page, shouldReset),
    getLastModified,
    getSlopeKeys,
    getTranscriberInfo,
    patchTranscription,
    reset: () => undoManager.withoutUndo(() => reset()),
    reaggregateDBScan,
    reaggregateOptics,
    rearrangePages,
    redefineTranscription,
    retrieveTranscriptions,
    saveMostRecentPatch,
    saveTranscription,
    selectTranscription,
    setActiveTranscription,
    setParsedExtracts,
    setTextObject,
    setTranscription: (transcription) => undoManager.withoutUndo(() => setTranscription(transcription)),
    toggleError: () => undoManager.withoutUndo(() => toggleError()),
    undo,
    unlockTranscription,
    updateApproval: (isChecked) => undoManager.withoutUndo(() => updateApproval(isChecked))
  }
}).views(self => ({
  get activeSlope () {
    const activeSlopeKey = `frame${self.index}.${self.slopeIndex}`
    return self.slopeDefinitions[activeSlopeKey]
  },

  get approved () {
    return !!(self.current && self.current.status === STATUS.APPROVED)
  },

  get lockedByCurrentUser () {
    const login = getRoot(self).auth.user && getRoot(self).auth.user.login;
    if (login && self.current) {
      return self.current.locked_by && self.current.locked_by === login
    }
    return false
  },

  get isActive () {
    return self.activeTranscriptionIndex !== undefined
  },

  get currentTranscriptions () {
    const current = self.current && self.current.text &&
      self.current.text.get(self.currentKey)
    return current || []
  },

  get currentKey () {
    return self.current.text.get(`frame${self.index}.${self.slopeIndex}`) ?
      `frame${self.index}.${self.slopeIndex}` : `frame${self.index}`
  },

  get readyForReview () {
    return !!(self.current && self.current.status === STATUS.READY)
  },

  get title () {
    return (self.current && self.current.id) || ''
  }
}))

export { TranscriptionsStore, Transcription }
