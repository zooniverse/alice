import { flow, types } from 'mobx-state-tree'
import { subjects } from '@zooniverse/panoptes-js'
import ASYNC_STATES from 'helpers/asyncStates'

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
}).actions(self => ({
  fetchSubject: flow (function * fetchSubject (id) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
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
