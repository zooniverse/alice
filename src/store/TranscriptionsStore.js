import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import * as Ramda from 'ramda'
import { toJS } from 'mobx'
import Reduction from './Reduction'
import { request } from 'graphql-request'

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
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1),
  extracts: types.array(types.frozen())
}).actions(self => ({
  checkForFlagUpdate: () => {
    let containsLineFlag = false
    self.current.text.forEach(t => {
      const flaggedItem = t.find(t => t.flagged)
      if (flaggedItem) containsLineFlag = true
    })
    self.current.flagged = containsLineFlag
    self.saveTranscription()
  },

  createTranscription: (transcription) => {
    const text = transcription.attributes.text
    const pages = Object.keys(text).filter(key => key.includes('frame')).length
    const containsFrameKey = (val, key) => key.indexOf('frame') >= 0
    const textObject = Ramda.pickBy(containsFrameKey, transcription.attributes.text)
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
  },

  deleteCurrentLine: function deleteCurrentLine() {
    if (Number.isInteger(self.activeTranscriptionIndex)) {
      const index = getRoot(self).subjects.index
      const page = self.current.text.get(`frame${index}`)
      page.splice(self.activeTranscriptionIndex, 1)
      self.saveTranscription()
      self.setActiveTranscription()
    }
  },

  retrieveTranscriptions: flow(function * retrieveTranscriptions(query) {
    const client = getRoot(self).client.tove
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const response = yield client.get(query)
      const resources = JSON.parse(response.body)
      self.totalPages = resources.meta.pagination.last || resources.meta.pagination.current
      resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchExtracts: flow(function * fetchExtracts(id) {
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
    yield request('https://caesar-staging.zooniverse.org/graphql', query).then((data) => {
      const index = getRoot(self).subjects.index
      validExtracts = data.workflow.extracts.filter(extract => extract.data[`frame${index}`])
    })
    self.extracts = validExtracts
  }),

  fetchTranscription: flow(function * fetchTranscription(id) {
    if (!id) return undefined
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/transcriptions/${id}`)
      const resource = JSON.parse(response.body)
      self.asyncState = ASYNC_STATES.READY
      return self.createTranscription(resource.data)
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchTranscriptions: flow (function * fetchTranscriptions(page = 0) {
    self.reset()
    self.page = page
    const groupName = getRoot(self).groups.title
    if (!groupName) return
    const searchQuery = getRoot(self).search.getSearchQuery()
    yield self.retrieveTranscriptions(`/transcriptions?filter[group_id_eq]=${groupName}&page[number]=${self.page + 1}${searchQuery}`)
  }),

  reset: () => {
    getRoot(self).aggregations.setModal(false)
    self.selectTranscription(null)
    self.all.clear()
  },

  saveTranscription: flow(function * saveTranscription() {
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
  }),

  selectTranscription: flow(function * selectTranscription(id = null) {
    let transcription = self.all.get(id)
    if (!transcription) transcription = yield self.fetchTranscription(id)
    if (id) yield self.fetchExtracts(id)
    self.setTranscription(transcription)
    self.current = id || undefined
  }),

  setTextObject: (text) => {
    const index = getRoot(self).subjects.index
    self.current.text.set(`frame${index}`, text)
  },

  setTranscription: (transcription) => {
    if (transcription) {
      try {
        self.all.put(transcription)
      } catch (error) {
        console.error(error)
      }
    }
  },

  updateApproval: flow(function * updateApproval(isChecked) {
    const isAdmin = getRoot(self).projects.isAdmin
    const query = { data: { type: 'transcriptions', attributes: { status: 'in_progress' } }}
    if (!isChecked) {
      const newStatus = isAdmin ? 'approved' : 'ready'
      query.data.attributes.status = newStatus
    }
    self.current.status = query.data.attributes.status
    const client = getRoot(self).client.tove
    yield client.patch(`/transcriptions/${self.current.id}`, { body: query })
  }),

  setActiveTranscription: function(id) {
    self.activeTranscriptionIndex = id
  }
})).views(self => ({
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
