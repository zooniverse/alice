import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import * as Ramda from 'ramda'
import { toJS } from 'mobx'

const Reduction = types.model('Reduction', {
  clusters_x: types.array(types.number),
  clusters_y: types.array(types.number),
  clusters_text: types.array(types.array(types.string)),
  consensus_text: types.optional(types.string, ''),
  consensus_score: types.number,
  edited_consensus_text: types.optional(types.string, ''),
  extract_index: types.array(types.integer),
  flagged: types.optional(types.boolean, false),
  gold_standard: types.array(types.boolean),
  gutter_label: types.integer,
  line_slope: types.number,
  low_consensus: types.optional(types.boolean, false),
  number_views: types.integer,
  seen: types.optional(types.boolean, false),
  slope_label: types.integer,
  user_ids: types.array(types.integer)
})
.actions(self => ({
  setConsensusText: (text, isOriginalOption = false) => {
    self.edited_consensus_text = isOriginalOption ? '' : text
  },

  toggleCurrentFlag: function() {
    self.flagged = !self.flagged
  },

  toggleCurrentSeen: function() {
    self.seen = !self.seen
  }
}))

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
  transcribed_lines: types.optional(types.integer, 0),
  text: Extension
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  activeTranscriptionIndex: types.maybe(types.integer),
  all: types.map(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Transcription),
  error: types.optional(types.string, ''),
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1)
}).actions(self => ({
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
    console.log(updatedTranscription);
    const query = { data: { type: 'transcriptions', attributes: { text: updatedTranscription } } }
    yield client.patch(`/transcriptions/${self.current.id}`, { body: query })
  }),

  selectTranscription: flow(function * selectTranscription(id = null) {
    let transcription = self.all.get(id)
    if (!transcription) transcription = yield self.fetchTranscription(id)
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
    const isResearcher = getRoot(self).projects.isResearcher
    const query = { data: { type: 'transcriptions', attributes: { status: 'in_progress' } }}
    if (!isChecked) {
      const newStatus = isResearcher ? 'approved' : 'ready'
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
