import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Workflow = types
  .model('Workflow', {
    display_name: types.optional(types.string, ''),
    groups: types.optional(types.frozen(), {}),
    id: types.identifier,
    project_id: types.optional(types.string, '')
  })

const WorkflowsStore = types.model('WorkflowsStore', {
  all: types.map(Workflow),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Workflow),
  error: types.optional(types.string, '')
}).actions(self => ({
  createWorkflow: (workflow) => {
    return Workflow.create({
      display_name: workflow.attributes.display_name,
      id: workflow.id,
      project_id: workflow.relationships.project.data.id,
      groups: workflow.attributes.groups
    })
  },

  fetchWorkflows: flow (function * fetchWorkflows(projectId) {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/workflows?filter[project_id_eq]=${projectId}`)
      const workflows = JSON.parse(response.body)
      workflows.data.forEach(workflow => self.all.put(self.createWorkflow(workflow)))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  getWorkflow: flow (function * getWorkflow(id) {
    console.log('LOOK');
    if (!id) return undefined
    console.log('TWICE');
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/workflows/${id}`)
      const resource = JSON.parse(response.body)
      self.asyncState = ASYNC_STATES.READY
      console.log('resource', resource);
      return self.createWorkflow(resource.data)
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  reset: () => {
    self.selectWorkflow(null)
    self.all.clear()
  },

  selectWorkflow: flow (function * selectWorkflow(id = null) {
    let workflow = self.all.get(id)
    if (!workflow) workflow = yield self.getWorkflow(id)
    const groups = (workflow && workflow.groups) || []
    getRoot(self).groups.setGroups(groups)
    self.setWorkflow(workflow)
    self.current = id || undefined
  }),

  setState: function(state) {
    self.asyncState = state
  },

  setWorkflow: (workflow) => {
    if (workflow) {
      try {
        self.all.put(workflow)
      } catch (error) {
        console.error(error)
      }
    }
  }
})).views(self => ({
  get id () {
    return self.current && self.current.id
  },

  get title () {
    return (self.current && self.current.display_name) || ''
  }
}))

export { Workflow, WorkflowsStore }
