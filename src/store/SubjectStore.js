import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'
import { ASM_INDIVIDUAL_ID, ASM_COLLABORATIVE_ID } from 'config'

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
  originalSubjectCheck: flow (function * originalSubjectCheck (id) {
    const workflows = getRoot(self).workflows

    if (workflows.current.id === ASM_INDIVIDUAL_ID) {
      const { current } = getRoot(self).transcriptions
      const { client } = getRoot(self)

      const response = yield client.get(`/transcriptions?filter[workflow_id_eq]=${ASM_COLLABORATIVE_ID}&filter[internal_id_eq]=${current.internal_id}`)
      const resources = JSON.parse(response.body)
      if (resources.data.length) {
        id = resources.data[0].id
      }
    }
    return id
  }),

  fetchSubject: flow (function * fetchSubject (id) {
    // This is temporary while we test
    id = yield self.originalSubjectCheck(id)

    self.asyncState = ASYNC_STATES.LOADING
    try {
      const [subject] = yield apiClient.type('subjects').get({ id })
      if (subject) {
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
      self.current = undefined
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
