import apiClient from 'panoptes-client/lib/api-client.js';
import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import ProjectFactory from './factories/project'
import { Project } from './ProjectsStore'

let projectsStore
let ownedProject = ProjectFactory.build()
let collabProject = ProjectFactory.build({ id: 2 })

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
  roles: ['collaborator']
}
let userRoles = [ownerRole, collabRole]

let roles = { 1: 'Project Owner', 2: 'Moderator' }
let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [ownedProject, collabProject]
        })
    }
  )
}

const rootStore = AppStore.create({
  auth: {
    user: { id: '1' }
  },
  client: { tove: toveStub },
  projects: { roles }
})

describe('ProjectsStore', function () {
  beforeAll(function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([ownedProject, collabProject])
        }
      } )
    projectsStore = rootStore.projects
  })

  it('should exist', function () {
    expect(projectsStore).toBeDefined()
  })

  it('should fetch projects', async function () {
    await projectsStore.getProjects()
    const mergedOwnerProject = { ...ownedProject, role: roles[ownedProject.id] }
    const mergedCollabProject = { ...collabProject, role: roles[collabProject.id] }
    expect(projectsStore.ownerProjects).toEqual([mergedOwnerProject])
    expect(projectsStore.collabProjects).toEqual([mergedCollabProject])
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.READY)
    expect(projectsStore.error).toBe('')
  })

  it('should select a project', function () {
    const project = Project.create({ id: '1' })
    projectsStore.selectProject(project)
    expect(projectsStore.current).toEqual(project)
  })
})

describe('ProjectsStore error states', function () {
  let error = { message: 'Failed to Return' }
  it('should handle an error on project fetch', async function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.reject(error)
        }
      } )
    projectsStore = rootStore.projects
    await projectsStore.getProjects()
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
      } )
    projectsStore = rootStore.projects
    await projectsStore.getRoles()
    expect(projectsStore.roles).toEqual({ 1: 'Project Owner', 2: 'Moderator' })
  })
})
