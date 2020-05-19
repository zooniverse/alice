import apiClient from 'panoptes-client/lib/api-client.js';
import ASYNC_STATES from 'helpers/asyncStates'
import { when } from 'jest-when'
import mockJWT from 'helpers/mockJWT'
import { AppStore } from './AppStore'
import ProjectFactory from './factories/project'

let projectsStore
let ownedProject = ProjectFactory.build()
let collabProject = ProjectFactory.build({ id: '2', display_name: 'Second Project' })
let viewerProject = ProjectFactory.build({ id: '3', display_name: 'Third Project' })
let error = { message: 'Failed to Return' }

let ownerRole = {
  links: {
     project: '1'
  },
  roles: ['owner']
}
let collabRole = {
  links: {
     project: '2'
  },
  roles: ['expert']
}
let viewerRole = {
  links: {
     project: '3'
  },
  roles: ['tester']
}
let userRoles = [ownerRole, collabRole, viewerRole]

let roles = { 1: 'Admin', 2: 'Editor', 3: 'Viewer' }
let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [ownedProject, collabProject, viewerProject]
        })
    }
  )
}

const rootStore = AppStore.create({
  auth: {
    user: { id: '1' }
  },
  client: { tove: mockJWT(toveStub), toveZip: mockJWT() }
})

describe('ProjectsStore', function () {
  beforeAll(function () {
    const clientSpy = jest.spyOn(apiClient, 'type')
    when(clientSpy).calledWith('projects')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([ownedProject, collabProject, viewerProject])
        }
      })
    when(clientSpy).calledWith('project_roles')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([ownerRole, collabRole, viewerRole])
        }
      })
    projectsStore = rootStore.projects
  })

  it('should exist', function () {
    expect(projectsStore).toBeDefined()
  })

  it('should not set a workflow if give the wrong info', function () {
    expect(projectsStore.all.size).toBe(0)
    projectsStore.setProject(1)
    expect(projectsStore.all.size).toBe(0)
  })

  it('should fetch projects', async function () {
    await projectsStore.getProjects()
    const mergedOwnerProject = { ...ownedProject, role: roles[ownedProject.id] }
    const mergedCollabProject = { ...collabProject, role: roles[collabProject.id] }
    const mergedViewerProject = { ...viewerProject, role: roles[viewerProject.id] }
    expect(projectsStore.ownerProjects).toEqual([mergedOwnerProject])
    expect(projectsStore.collabProjects).toEqual([mergedCollabProject, mergedViewerProject])
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.READY)
    expect(projectsStore.error).toBe('')
  })

  it('should select a project', function () {
    projectsStore.selectProject(ownedProject.id)
    expect(projectsStore.current.id).toEqual(ownedProject.id)
  })

  it('should mark a project undefined if none selected', async function () {
    await projectsStore.selectProject(null)
    expect(projectsStore.current).toEqual(undefined)
  })

  it('should return a project title', function () {
    projectsStore.selectProject('2')
    expect(projectsStore.title).toBe(collabProject.display_name)
  })

  it('should get the current role', function () {
    projectsStore.selectProject('1')
    expect(projectsStore.role).toBe('Admin')
  })

  it('should state if the current role is admin', function () {
    projectsStore.selectProject('1')
    expect(projectsStore.isAdmin).toBe(true)
  })

  it('should state if the current role is viewer', function () {
    projectsStore.selectProject('3')
    expect(projectsStore.isViewer).toBe(true)
  })

  it('should get the current project id', function () {
    projectsStore.selectProject('1')
    expect(projectsStore.id).toBe('1')
  })
})

describe('ProjectsStore getProject', function () {
  it('returns undefined if no id passed', async function () {
    const returnValue = await projectsStore.getProject(null)
    expect(returnValue).toBe(undefined)
  })

  it('should return a new project', async function () {
    const returnValue = await projectsStore.getProject('1')
    expect(returnValue).toBeDefined()
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.READY)
  })
})

describe('ProjectsStore error states', function () {
  beforeAll(function() {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.reject(error)
        }
      })
  })

  it('getProjects should handle an error on project fetch', async function () {
    projectsStore = rootStore.projects
    await projectsStore.getProjects()
    expect(projectsStore.error).toBe(error.message)
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.ERROR)
  })

  it('getProject should handle a failure', async function () {
    const returnValue = await projectsStore.getProject('1')
    expect(returnValue).toBe(undefined)
    expect(projectsStore.error).toBe(error.message)
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.ERROR)
  })
})

describe('ProjectsStore getRoles', function () {
  it('should set roles correctly', async function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve(userRoles)
        }
      })
    projectsStore = rootStore.projects
    await projectsStore.getRoles()
    expect(projectsStore.roles).toEqual({ 1: 'Admin', 2: 'Editor', 3: 'Viewer' })
  })
})

describe('Default role', function () {
  it('should be viewer', async function () {
    const clientSpy = jest.spyOn(apiClient, 'type')
    when(clientSpy).calledWith('projects')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([collabProject])
        }
      })
    when(clientSpy).calledWith('project_roles')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([])
        }
      })
    const rootStore = AppStore.create({
      auth: {
        user: { id: '1' }
      },
      client: { tove: mockJWT(toveStub), toveZip: mockJWT() }
    })
    projectsStore = rootStore.projects
    await projectsStore.getProjects()
    expect(projectsStore.collabProjects[0].role).toEqual('Viewer')
  })
})
