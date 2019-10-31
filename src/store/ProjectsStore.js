import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js';
import ASYNC_STATES from 'helpers/asyncStates'

const ProjectsStore = types.model('ProjectsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  collabIds: types.array(types.string),
  collabProjects: types.array(types.frozen({})),
  ownerProjects: types.array(types.frozen({})),
  ownerIds: types.array(types.string),
  error: types.optional(types.string, '')
}).actions(self => ({
  getRoles: flow (function * getRoles() {
    const user = getRoot(self).auth.user
    const roles = yield apiClient.type('project_roles').get({ user_id: user.id, page_size: 50 })
    const ownerRoles = roles.filter(role => role.roles.includes('owner'))
    self.ownerIds = ownerRoles.map(role => role.links.project)

    const collabRoles = roles.filter(role => !role.roles.includes('owner'))
    self.collabIds = collabRoles.map(role => role.links.project)
  }),

  getProjects: flow (function * getProjects() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      self.getRoles()
      const response = yield client.get('/projects')
      const resources = JSON.parse(response.body)
      const ids = resources.data.map(project => project.id)
      const projects = yield apiClient.type('projects').get({ id: ids.toString(), cards: true })

      self.collabProjects = projects.filter(project => self.collabIds.includes(project.id))
      self.ownerProjects = projects.filter(project => self.ownerIds.includes(project.id))

      self.asyncState = ASYNC_STATES.READY
      self.error = ''
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  })
}))

export { ProjectsStore }
