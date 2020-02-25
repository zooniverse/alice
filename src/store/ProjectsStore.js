import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'

const ROLES = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer'
}

const adminRoles = ['owner', 'collaborator']
const editorRoles = ['expert', 'researcher', 'moderator']

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

  getRoles: flow (function * getRoles(ids = []) {
    const user = getRoot(self).auth.user
    const roles = yield apiClient.type('project_roles').get({ user_id: user.id, project_id: ids })
    self.roles = roles.reduce((roles, role) => {
      let title = ROLES.VIEWER
      if (role.roles.some(role => editorRoles.includes(role))) { title = ROLES.EDITOR }
      if (role.roles.some(role => adminRoles.includes(role))) { title = ROLES.ADMIN }
      roles[role.links.project] = title
      return roles
    }, {})
  }),

  getProjects: flow (function * getProjects() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get('/projects')
      const resources = JSON.parse(response.body)
      const ids = resources.data.map(project => project.id)
      const projects = yield apiClient.type('projects').get({ id: ids.toString(), cards: true })
      console.log('get the roles');
      yield self.getRoles(ids)
      console.log('DId we get em');

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
      if (!self.roles) yield self.getRoles(id)
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

  get isAdmin () {
    return (self.current && self.current.role === ROLES.ADMIN) || false
  },

  get role () {
    return self.current && self.current.role
  },

  get title () {
    return self.current && self.current.display_name.length ? self.current.display_name : 'Select Project'
  },

  get collabProjects () {
    return Array.from(self.all.values()).filter(project => project.role !== ROLES.ADMIN)
  },

  get ownerProjects () {
    return Array.from(self.all.values()).filter(project => project.role === ROLES.ADMIN)
  }
}))

export { Project, ProjectsStore, ROLES }
