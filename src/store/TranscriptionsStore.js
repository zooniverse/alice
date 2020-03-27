import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import * as Ramda from 'ramda'
import { undoManager } from 'store/AppStore'
import apiClient from 'panoptes-client/lib/api-client.js'
import { reaction, toJS } from 'mobx'
import { request } from 'graphql-request'
import { config } from 'config'
import { constructText, mapExtractsToReductions } from 'helpers/parseTranscriptionData'
import getError, { TranscriptionError } from 'helpers/getError'
import Reduction from './Reduction'

let Frame = types.array(Reduction)
const Extension = types.refinement(types.map(Frame), snapshot => {
  return Ramda.all(Ramda.startsWith('frame'), Ramda.keys(snapshot))
})

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flagged: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  lastModified: types.optional(types.string, ''),
  low_consensus_lines: types.optional(types.integer, 0),
  pages: types.optional(types.integer, 0),
  status: types.optional(types.string, ''),
  text: Extension,
  transcribed_lines: types.optional(types.number, 0)
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
  showSaveTranscriptionError: types.optional(types.boolean, false),
  totalPages: types.optional(types.number, 1),
  rawExtracts: types.array(types.frozen()),
  parsedExtracts: types.array(types.frozen())
}).actions(self => {
  function arrangeExtractsByUser() {
    return self.rawExtracts.reduce((list, extract) => {
      if (!list[extract.userId]) list[extract.userId] = []
      list[extract.userId].push({ ...extract.data, time: extract.classificationAt })
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

  function changeIndex(index) {
    self.index = index
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

  function createTranscription(transcription, lastModified = '') {
    const text = (transcription.attributes && transcription.attributes.text) || {}
    const pages = Object.keys(text).filter(key => key.includes('frame')).length
    const containsFrameKey = (val, key) => key.indexOf('frame') >= 0
    const textObject = Ramda.pickBy(containsFrameKey, text)
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      lastModified,
      low_consensus_lines: text.low_consensus_lines,
      pages,
      status: transcription.attributes.status,
      text: textObject,
      transcribed_lines: text.transcribed_lines
    })
  }

  function deleteCurrentLine() {
    if (Number.isInteger(self.activeTranscriptionIndex)) {
      const page = self.current.text.get(`frame${self.index}`)
      page.splice(self.activeTranscriptionIndex, 1)
      self.saveTranscription()
      self.setActiveTranscription()
    }
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
      validExtracts = data.workflow.extracts.filter(extract => Object.entries(extract.data).length > 0)
    })
    undoManager.withoutUndo(() => self.rawExtracts = validExtracts)
    const arrangedExtractsByUser = self.arrangeExtractsByUser()
    yield self.getTranscriberInfo(arrangedExtractsByUser)
    self.setParsedExtracts(arrangedExtractsByUser)
  })

  const fetchTranscriptions = function * fetchTranscriptions(page = 0) {
    self.reset()
    self.page = page
    const groupName = getRoot(self).groups.title
    const workflow = getRoot(self).workflows.current.id
    if (!groupName || !workflow) return
    const searchQuery = getRoot(self).search.getSearchQuery()
    yield self.retrieveTranscriptions(`/transcriptions?filter[group_id_eq]=${groupName}&filter[workflow_id_eq]=${workflow}&page[number]=${self.page + 1}${searchQuery}`)
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

  const patchTranscription = flow(function * patchTranscription(query) {
    const client = getRoot(self).client.tove
    let lastModified
    try {
      yield client.patch(`/transcriptions/${self.current.id}`, { body: query, headers: { 'If-Unmodified-Since': self.current.lastModified } }).then(response => {
        if (response.ok) {
          lastModified = getLastModified(response)
          return response
        } else {
          return Promise.reject(response)
        }
      })
      undoManager.withoutUndo(() => {
        self.error = null
        self.asyncState = ASYNC_STATES.READY
      })
    } catch (err) {
      undoManager.withoutUndo(() => {
        self.error = getError(err)
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
    undoManager.withoutUndo(() => {
      if (lastModified) self.current.lastModified = lastModified
    })
  })

  function reset() {
    getRoot(self).aggregations.setModal(false)
    self.current = undefined
    self.index = 0
    self.all.clear()
  }

  const retrieveTranscriptions = flow(function * retrieveTranscriptions(query) {
    const client = getRoot(self).client.tove
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    try {
      const response = yield client.get(query)
      const resources = JSON.parse(response.body)
      undoManager.withoutUndo(() => {
        resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      })
      undoManager.withoutUndo(() => {
        self.totalPages = resources.meta.pagination.last || resources.meta.pagination.current
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

  const saveTranscription = flow(function * saveTranscription() {
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    const textBlob = toJS(self.current.text)
    const lineCounts = {
      low_consensus_lines: self.current.low_consensus_lines,
      transcribed_lines: self.current.transcribed_lines
    }
    const updatedTranscription = Object.assign(lineCounts, textBlob)
    const query = {
      data: {
        type: 'transcriptions',
        attributes: {
          flagged: self.current.flagged,
          text: updatedTranscription
        }
      }
    }
    yield self.patchTranscription(query)
  })

  const selectTranscription = flow(function * selectTranscription(id = null) {
    if (!id) return undefined
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    const client = getRoot(self).client.tove
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

  function setParsedExtracts(arrangedExtractsByUser) {
    const extracts = []
    const extractsByUser = arrangedExtractsByUser || self.arrangeExtractsByUser()
    const transcriptionFrame = self.current && self.current.text && self.current.text.get(`frame${self.index}`)
    const reductionText = transcriptionFrame && transcriptionFrame.map(transcription => constructText(transcription))
    transcriptionFrame && transcriptionFrame.forEach((reduction, reductionIndex) => {
      extracts.push(mapExtractsToReductions(extractsByUser, reduction, reductionIndex, reductionText, self.index, self.extractUsers))
    })
    self.parsedExtracts = extracts
  }

  function setTextObject(text) {
    self.current.text.set(`frame${self.index}`, text)
    self.setParsedExtracts()
    self.saveTranscription()
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

  function updateApproval(isChecked) {
    self.setActiveTranscription()
    const isAdmin = getRoot(self).projects.isAdmin
    const query = { data: { type: 'transcriptions', attributes: { status: 'in_progress' } }}
    if (!isChecked) {
      const newStatus = isAdmin ? 'approved' : 'ready'
      query.data.attributes.status = newStatus
    }
    self.current.status = query.data.attributes.status
    self.patchTranscription(query)
  }

  return {
    afterAttach,
    arrangeExtractsByUser,
    changeIndex,
    checkForFlagUpdate,
    createTranscription: (transcription, lastModified) => undoManager.withoutUndo(() => createTranscription(transcription, lastModified)),
    deleteCurrentLine,
    fetchExtracts,
    fetchTranscriptions: (page) => undoManager.withoutUndo(() => flow(fetchTranscriptions))(page),
    getLastModified,
    getTranscriberInfo,
    patchTranscription,
    reset: () => undoManager.withoutUndo(() => reset()),
    retrieveTranscriptions,
    saveTranscription,
    selectTranscription,
    setActiveTranscription,
    setParsedExtracts: (extractsByUser) => undoManager.withoutUndo(() => setParsedExtracts(extractsByUser)),
    setTextObject,
    setTranscription: (transcription) => undoManager.withoutUndo(() => setTranscription(transcription)),
    toggleError: () => undoManager.withoutUndo(() => toggleError()),
    undo,
    updateApproval: (isChecked) => undoManager.withoutUndo(() => updateApproval(isChecked))
  }
}).views(self => ({
  get approved () {
    return !!(self.current && self.current.status === 'approved')
  },

  get approvedCount () {
    let count = 0;
    self.all.forEach(transcription => {
      if (transcription.status === 'approved') {
        count ++
      }
    })
    return count;
  },

  get readyForReview () {
    return !!(self.current && self.current.status === 'ready')
  },

  get title () {
    return (self.current && self.current.id) || ''
  }
}))

export { TranscriptionsStore, Transcription }
