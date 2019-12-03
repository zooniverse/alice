import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'

const Project = types
  .model('Project', {
    avatar_src: types.optional(types.string, ''),
    id: types.optional(types.string, ''),
    display_name: types.optional(types.string, ''),
    role: types.optional(types.string, '')
  })

const ProjectsStore = types.model('ProjectsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  collabProjects: types.array(types.frozen({}), null),
  current: types.optional(Project, {}),
  error: types.optional(types.string, ''),
  ownerProjects: types.array(types.frozen({}), null),
  roles: types.optional(types.frozen({}), null),
}).actions(self => ({
  getRoles: flow (function * getRoles() {
    const user = getRoot(self).auth.user
    const roles = yield apiClient.type('project_roles').get({ user_id: user.id, page_size: 50 })
    self.roles = roles.reduce((roles, role) => {
      let title = 'Viewer'
      if (role.roles.includes('owner')) { title = 'Project Owner' }
      if (role.roles.includes('collaborator')) { title = 'Moderator' }
      roles[role.links.project] = title
      return roles
    }, {})
  }),

  getProjects: flow (function * getProjects() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      if (!self.roles) yield self.getRoles()
      const response = yield client.get('/projects')
      const resources = JSON.parse(response.body)
      const ids = resources.data.map(project => project.id)
      const projects = yield apiClient.type('projects').get({ id: ids.toString(), cards: true })

      let collabProjects = []
      let ownerProjects = []

      projects.forEach((project) => {
        const role = self.roles[project.id] || 'Viewer'
        if (role === 'Project Owner') {
          return ownerProjects.push({...project, role })
        }
        return collabProjects.push({...project, role })
      })

      self.collabProjects = collabProjects
      self.ownerProjects = ownerProjects
      self.asyncState = ASYNC_STATES.READY
      self.error = ''
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  selectProject: function(project) {
    self.current = project || Project.create()
  }
})).views(self => ({
  get id () {
    return self.current.id
  },

  get title () {
    return self.current.display_name.length ? self.current.display_name : 'Select Project'
  }
}))

export { Project, ProjectsStore }
