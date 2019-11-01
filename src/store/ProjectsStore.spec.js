import apiClient from 'panoptes-client/lib/api-client.js';
import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import ProjectFactory from './factories/project'

let projectsStore
let panoptesProject = ProjectFactory.build()
let roles = { 1: 'Project Owner' }
let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [panoptesProject]
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

describe('Model > ProjectsStore', function () {
  beforeAll(function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([panoptesProject])
        }
      } )
    projectsStore = rootStore.projects
  })

  it('should exist', function () {
    expect(projectsStore).toBeDefined()
  })

  it('should fetch projects', async function () {
    await projectsStore.getProjects()
    const mergedProject = { ...panoptesProject, role: roles[panoptesProject.id] }
    expect(projectsStore.ownerProjects).toEqual([mergedProject])
    expect(projectsStore.collabProjects.length).toBe(0)
    expect(projectsStore.asyncState).toBe(ASYNC_STATES.READY)
    expect(projectsStore.error).toBe('')
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
})
