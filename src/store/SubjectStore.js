import { types, flow } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import history from '../history'

const TEMPORARY_SUBJECT_ID = '72815'

const SubjectStore = types.model('SubjectStore', {
  current: types.optional(types.frozen({}), null),
  index: types.optional(types.number, 0),
}).actions(self => ({
  fetchSubject: flow(function * fetchSubject (id, redirect = false) {
    try {
      const subject = yield apiClient.type('subjects').get(TEMPORARY_SUBJECT_ID)
      if (subject) {
        self.current = subject
        if (redirect) history.push(`${history.location.pathname}/${id}/edit`)
      }
    } catch (error) {
      console.log(error);
    }
  }),
  getCurrent(params) {
    if (self.current) return self.current
    if (!self.current && params.subject) self.fetchSubject(params.subject)
  }
}))

export { SubjectStore }
