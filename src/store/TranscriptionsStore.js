import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  text: types.optional(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.map(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Transcription),
  error: types.optional(types.string, ''),
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1)
}).actions(self => ({
  createTranscription: (transcription) => {
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      status: transcription.attributes.status,
      text: transcription.attributes.text
    })
  },

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
    self.page = page
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.title
    if (!groupName) return
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}&page[number]=${self.page + 1}`)
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

  reset: () => {
    self.selectTranscription(null)
    self.all.clear()
  },

  selectTranscription: flow(function * selectTranscription(id = null) {
    let transcription = self.all.get(id)
    if (!transcription) transcription = yield self.fetchTranscription(id)
    self.setTranscription(transcription)
    self.current = id || undefined
  }),

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
  })
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
