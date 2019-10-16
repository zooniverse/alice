import { types, flow } from 'mobx-state-tree'
import { subjects } from '@zooniverse/panoptes-js'
import ASYNC_STATES from 'helpers/asyncStates'
import history from '../history'

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
  index: types.optional(types.number, 0),
}).actions(self => ({
  changeIndex: (index) => {
    self.index = index
  },

  fetchSubject: flow (function * fetchSubject (id, redirect = false) {
    self.asyncState = ASYNC_STATES.FETCHING
    try {
      const response = yield subjects.get({ id: TEMPORARY_SUBJECT_ID })
      if (response.body.subjects[0]) {
        const subject = response.body.subjects[0]
        const newSubject = Subject.create({
          id: subject.id,
          locations: subject.locations,
          metadata: subject.metadata
        })
        self.current = newSubject
        if (redirect) history.push(`${history.location.pathname}/${id}/edit`)
      }
    } catch (error) {
      console.log(error);
    }
  })
}))

export { SubjectStore }
