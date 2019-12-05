import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  subject_id: types.optional(types.number, 0),
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
      subject_id: transcription.attributes.subject_id,
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

  fetchTranscriptionsForSubject: flow (function * fetchTranscriptionsForSubject(id) {
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/transcriptions?filter[subject_id_eq]=${id}`)
      const resources = JSON.parse(response.body)
      const transcription = resources.data && resources.data[0]
      self.current = self.createTranscription(transcription)
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  selectTranscription: flow(function * selectTranscription(id = null) {
    let transcription = self.all.get(id)
    if (!transcription) {
      transcription = yield self.fetchTranscription(id)
    }
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
  }
}))

export { TranscriptionsStore, Transcription }
