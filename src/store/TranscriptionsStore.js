import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import * as Ramda from 'ramda'
import { toJS } from 'mobx'
import { undoManager } from 'store/AppStore'
import { request } from 'graphql-request'
import { config } from 'config'
import Reduction from './Reduction'

let Frame = types.array(Reduction)
const Extension = types.refinement(types.map(Frame), snapshot => {
  return Ramda.all(Ramda.startsWith('frame'), Ramda.keys(snapshot))
})

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flagged: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
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
  error: types.optional(types.string, ''),
  index: types.optional(types.number, 0),
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1),
  extracts: types.array(types.frozen())
}).actions(self => {
  function changeIndex(index) {
    self.index = index
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

  function createTranscription(transcription) {
    const text = (transcription.attributes && transcription.attributes.text) || {}
    const pages = Object.keys(text).filter(key => key.includes('frame')).length
    const containsFrameKey = (val, key) => key.indexOf('frame') >= 0
    const textObject = Ramda.pickBy(containsFrameKey, text)
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
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

  const fetchExtracts = function * fetchExtracts(id) {
    const workflowId = getRoot(self).workflows.current.id
    // TODO: The extractor key below will need to change eventually. This is just
    // to test the code with ASM staging data. In the future, this will change to
    // 'alice' once current extractors have been backfilled with duplicate extractors
    // with the correct 'alice' key.
    const query = `{
      workflow(id: ${workflowId}) {
        extracts(subjectId: ${id}, extractorKey: "ext-17") {
          data, userId
        }
      }
    }`
    let validExtracts = []
    yield request(config.caesar, query).then((data) => {
      const index = getRoot(self).subjects.index
      validExtracts = data.workflow.extracts.filter(extract => extract.data[`frame${index}`])
    })
    self.extracts = validExtracts
  }

  const fetchTranscription = flow(function * fetchTranscription(id) {
    if (!id) return undefined
    undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.LOADING)
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/transcriptions/${id}`)
      const resource = JSON.parse(response.body)
      undoManager.withoutUndo(() => self.asyncState = ASYNC_STATES.READY)
      return self.createTranscription(resource.data)
    } catch (error) {
      console.warn(error);
      undoManager.withoutUndo(() => {
        self.error = error.message
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
  })

  const fetchTranscriptions = function * fetchTranscriptions(page = 0) {
    self.reset()
    self.page = page
    const groupName = getRoot(self).groups.title
    if (!groupName) return
    const searchQuery = getRoot(self).search.getSearchQuery()
    yield self.retrieveTranscriptions(`/transcriptions?filter[group_id_eq]=${groupName}&page[number]=${self.page + 1}${searchQuery}`)
  }

  function reset() {
    getRoot(self).aggregations.setModal(false)
    self.current = undefined
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
        self.error = error.message
        self.asyncState = ASYNC_STATES.ERROR
      })
    }
  })

  const saveTranscription = flow(function * saveTranscription() {
    const textBlob = toJS(self.current.text)
    const client = getRoot(self).client.tove
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
    yield client.patch(`/transcriptions/${self.current.id}`, { body: query })
  })

  const selectTranscription = flow(function * selectTranscription(id = null) {
    const transcription = yield self.fetchTranscription(id)
    yield self.fetchExtracts(id)
    self.setTranscription(transcription)
    undoManager.withoutUndo(() => {
      self.current = id
    })
  })

  function setActiveTranscription(id) {
    self.activeTranscriptionIndex = id
  }

  function setTextObject(text) {
    self.current.text.set(`frame${self.index}`, text)
    self.saveTranscription()
  }

  function setTranscription(transcription) {
    if (transcription) {
      try {
        self.all.put(transcription)
      } catch (error) {
        console.error(error)
      }
    }
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

  const updateApproval = flow(function * updateApproval(isChecked) {
    self.setActiveTranscription()
    const isAdmin = getRoot(self).projects.isAdmin
    const query = { data: { type: 'transcriptions', attributes: { status: 'in_progress' } }}
    if (!isChecked) {
      const newStatus = isAdmin ? 'approved' : 'ready'
      query.data.attributes.status = newStatus
    }
    self.current.status = query.data.attributes.status
    const client = getRoot(self).client.tove
    yield client.patch(`/transcriptions/${self.current.id}`, { body: query })
  })

  return {
    changeIndex,
    checkForFlagUpdate,
    createTranscription: (transcription) => undoManager.withoutUndo(() => createTranscription(transcription)),
    deleteCurrentLine,
    fetchExtracts: (id) => undoManager.withoutUndo(() => flow(fetchExtracts))(id),
    fetchTranscription,
    fetchTranscriptions: (page) => undoManager.withoutUndo(() => flow(fetchTranscriptions))(page),
    reset: () => undoManager.withoutUndo(() => reset()),
    retrieveTranscriptions,
    saveTranscription,
    selectTranscription,
    setActiveTranscription,
    setTextObject,
    setTranscription: (transcription) => undoManager.withoutUndo(() => setTranscription(transcription)),
    undo,
    updateApproval: (isChecked) => undoManager.withoutUndo(() => updateApproval(isChecked)),
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
