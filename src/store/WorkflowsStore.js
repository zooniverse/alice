import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const WorkflowsStore = types.model('WorkflowsStore', {
  all: types.array(types.frozen({})),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  error: types.optional(types.string, '')
}).actions(self => ({
  fetchWorkflows: flow (function * fetchWorkflows(id) {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get('/workflows')
      const resources = JSON.parse(response.body)
      self.all = resources.data
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  })
}))

export { WorkflowsStore }
