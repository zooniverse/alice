import { flow, getRoot, types } from 'mobx-state-tree'
import { subjects } from '@zooniverse/panoptes-js'
import ASYNC_STATES from 'helpers/asyncStates'

const TEMPORARY_SUBJECT_ID = '72815'

const Subject = types
  .model('Subject', {
    id: types.optional(types.string, ''),
    locations: types.array(types.frozen({})),
    metadata: types.frozen({}),
  })

const SubjectStore = types.model('SubjectStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Subject, {}),
  error: types.optional(types.string, ''),
  index: types.optional(types.number, 0)
}).actions(self => ({
  changeIndex: (index) => {
    self.index = index
  },

  fetchSubject: flow (function * fetchSubject (id = TEMPORARY_SUBJECT_ID) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
      yield getRoot(self).transcriptions.fetchTranscriptionsForSubject(id)
      const response = yield subjects.get({ id })
      if (response.body.subjects[0]) {
        const subject = response.body.subjects[0]
        const newSubject = Subject.create({
          id: subject.id,
          locations: subject.locations,
          metadata: subject.metadata
        })
        self.current = newSubject
        self.error = ''
      }
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
      self.transcriptions = resources.data.map((transcription) => {
        return Transcription.create({
          id: transcription.id,
          flagged: transcription.attributes.flagged,
          group_id: transcription.attributes.group_id,
          status: transcription.attributes.status,
          subject_id: transcription.attributes.subject_id,
          text: transcription.attributes.text
        })
      })
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  selectSubject: function(subject) {
    if (!subject) subject = Subject.create()
    self.current = subject
  }
})).views(self => ({
  get title () {
    return self.current.id || ''
  }
}))

export { Subject, SubjectStore }
