import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js';
import ASYNC_STATES from 'helpers/asyncStates'

const ProjectsStore = types.model('ProjectsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  index: types.array(types.frozen({})),
}).actions(self => ({
  getRoles: flow(function * getRoles() {
    const user = getRoot(self).auth.user
    console.log(user);
    // const roles = yield apiClient.type('project_roles').get({ user_id: user.id })
    // console.log(roles);
  }),

  getProjects: flow (function * getProjects() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      self.getRoles()
      const response = yield client.get('/projects')
      const resources = JSON.parse(response.body)
      const ids = resources.data.map(project => project.id)
      self.index = yield apiClient.type('projects').get({ id: ids.toString(), cards: true })
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.asyncState = ASYNC_STATES.ERROR
    }
  })
}))

export { ProjectsStore }
