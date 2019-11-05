import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Transcription = types.model('Transcription', {
  id: types.optional(types.string, ''),
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  subject_id: types.optional(types.number, 0),
  text: types.array(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.array(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Transcription, {}),
  error: types.optional(types.string, '')
}).actions(self => ({
  fetchTranscriptions: flow (function * fetchTranscriptions() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.current.display_name
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data.map((transcription) => {
        return Transcription.create({
          id: transcription.id,
          flagged: transcription.attributes.flagged,
          group_id: transcription.attributes.group_id,
          status: transcription.attributes.status,
          subject_id: transcription.attributes.subject_id,
          text: transcription.text
        })
      })
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  })
}))

export { TranscriptionsStore }
