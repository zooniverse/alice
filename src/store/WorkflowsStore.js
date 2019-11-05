import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Workflow = types
  .model('Workflow', {
    display_name: types.optional(types.string, ''),
    id: types.optional(types.string, ''),
    project_id: types.optional(types.string, '')
  })

const WorkflowsStore = types.model('WorkflowsStore', {
  all: types.array(types.frozen({})),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Workflow, {}),
  error: types.optional(types.string, '')
}).actions(self => ({
  fetchWorkflows: flow (function * fetchWorkflows(id) {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/workflows?filter[project_id_eq]=${id}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  selectWorkflow: function(workflow) {
    self.current = Workflow.create({
      display_name: workflow.attributes.display_name,
      id: workflow.id,
      project_id: workflow.relationships.project.data.id
    })
  },

  setState: function(state) {
    self.asyncState = state
  }
}))

export { WorkflowsStore }
