import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Workflow = types
  .model('Workflow', {
    display_name: types.optional(types.string, ''),
    groups: types.optional(types.frozen(), {}),
    id: types.optional(types.string, ''),
    project_id: types.optional(types.string, '')
  })

const WorkflowsStore = types.model('WorkflowsStore', {
  all: types.array(types.frozen({})),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Workflow, {}),
  error: types.optional(types.string, '')
}).actions(self => ({
  fetchWorkflows: flow (function * fetchWorkflows(projectId) {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/workflows?filter[project_id_eq]=${projectId}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchWorkflow: flow (function * fetchWorkflow(id) {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/workflows/${id}`)
      const resources = JSON.parse(response.body)
      self.selectWorkflow(resources.data)
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  selectWorkflow: function(workflow) {
    if (!workflow) {
      getRoot(self).groups.setGroups([])
      self.current = Workflow.create()
      return
    }
    getRoot(self).groups.setGroups(workflow.attributes.groups)
    self.current = Workflow.create({
      display_name: workflow.attributes.display_name,
      id: workflow.id,
      project_id: workflow.relationships.project.data.id,
      groups: workflow.attributes.groups
    })
  },

  setState: function(state) {
    self.asyncState = state
  }
})).views(self => ({
  get id () {
    return self.current.id
  },

  get title () {
    return self.current.display_name
  }
}))

export { Workflow, WorkflowsStore }
