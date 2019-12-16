import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Transcription = types.model('Transcription', {
  id: types.optional(types.string, ''),
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  subject_id: types.identifier,
  text: types.optional(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.map(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Transcription),
  error: types.optional(types.string, '')
}).actions(self => ({
  createTranscription: (transcription) => {
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      status: transcription.attributes.status,
      subject_id: transcription.attributes.subject_id.toString(),
      text: transcription.attributes.text
    })
  },

  fetchTranscription: flow(function * fetchTranscription(id) {
    if (!id) return undefined
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/transcriptions?filter[subject_id_eq]=${id}`)
      const resource = JSON.parse(response.body)
      self.asyncState = ASYNC_STATES.READY
      // TODO: Line below will have to change to resource.data when Tove begins delivering a single transcription
      return self.createTranscription(resource.data[0])
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchTranscriptions: flow (function * fetchTranscriptions() {
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.title
    if (!groupName) return
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}`)
      const resources = JSON.parse(response.body)
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
  }
})).views(self => ({
  get approvedCount () {
    let count = 0;
    self.all.forEach(transcription => {
      if (transcription.status === 'approved') {
        count ++
      }
    })
    return count;
  },

  get title () {
    return (self.current && self.current.subject_id) || ''
  }
}))

export { TranscriptionsStore, Transcription }
