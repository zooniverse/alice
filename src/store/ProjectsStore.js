import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'

const ROLES = {
  OWNER: 'Project Owner',
  MODERATOR: 'Moderator',
  VIEWER: 'Viewer'
}

const Project = types
  .model('Project', {
    avatar_src: types.optional(types.string, ''),
    id: types.identifier,
    display_name: types.optional(types.string, ''),
    role: types.optional(types.string, '')
  })

const ProjectsStore = types.model('ProjectsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  all: types.map(Project),
  current: types.safeReference(Project),
  error: types.optional(types.string, ''),
  roles: types.optional(types.frozen({}), null),
}).actions(self => ({
  createProject: (project, role) => {
    return Project.create({
      avatar_src: project.avatar_src,
      id: project.id,
      display_name: project.display_name,
      role
    })
  },

  getRoles: flow (function * getRoles() {
    const user = getRoot(self).auth.user
    const roles = yield apiClient.type('project_roles').get({ user_id: user.id, page_size: 50 })
    self.roles = roles.reduce((roles, role) => {
      let title = ROLES.VIEWER
      if (role.roles.includes('owner')) { title = ROLES.OWNER }
      if (role.roles.includes('collaborator')) { title = ROLES.MODERATOR }
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

      projects.forEach((project) => {
        const role = self.roles[project.id] || ROLES.VIEWER
        self.all.put(self.createProject(project, role))
      })

      self.asyncState = ASYNC_STATES.READY
      self.error = ''
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  getProject: flow (function * getProject(id) {
    if (!id) return undefined
    self.asyncState = ASYNC_STATES.LOADING
    try {
      if (!self.roles) yield self.getRoles()
      const response = yield apiClient.type('projects').get({ id, cards: true })
      const project = response[0]
      const role = self.roles[project.id] || ROLES.VIEWER
      self.asyncState = ASYNC_STATES.READY
      return self.createProject(project, role)
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  reset: () => {
    self.selectProject(null)
    self.all.clear()
  },

  selectProject: flow(function * selectProject(id = null) {
    let project = self.all.get(id)
    if (!project) project = yield self.getProject(id)
    self.setProject(project)
    self.current = id || undefined
  }),

  setProject: (project) => {
    if (project) {
      try {
        self.all.put(project)
      } catch (error) {
        console.error(error)
      }
    }
  }
})).views(self => ({
  get id () {
    return self.current && self.current.id
  },

  get role () {
    return self.current && self.current.role
  },

  get title () {
    return self.current && self.current.display_name.length ? self.current.display_name : 'Select Project'
  },

  get collabProjects () {
    return Array.from(self.all.values()).filter(project => project.role !== ROLES.OWNER)
  },

  get ownerProjects () {
    return Array.from(self.all.values()).filter(project => project.role === ROLES.OWNER)
  }
}))

export { Project, ProjectsStore, ROLES }
