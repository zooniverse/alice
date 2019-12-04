import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Transcription = types.model('Transcription', {
  id: types.optional(types.string, ''),
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  subject_id: types.optional(types.number, 0),
  text: types.optional(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.array(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Transcription, {}),
  error: types.optional(types.string, '')
}).actions(self => ({
  createTranscription: function createTranscription(transcription) {
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      status: transcription.attributes.status,
      subject_id: transcription.attributes.subject_id,
      text: transcription.attributes.text
    })
  },

  fetchTranscriptions: flow (function * fetchTranscriptions() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.title
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data.map((transcription) => {
        return self.createTranscription(transcription)
      })
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
  })
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
