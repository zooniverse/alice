import { AppStore } from './AppStore'

let appStore

const params = {
  project: '1',
  workflow: '1',
  group: '1',
  subject: '1'
}

const checkCurrentSpy = jest.fn().mockResolvedValue(null)
const initializeSpy = jest.fn()
const selectProjectSpy = jest.fn().mockResolvedValue(null)
const selectWorkflowSpy = jest.fn().mockResolvedValue(null)
const selectGroupSpy = jest.fn()
const selectTranscriptionSpy = jest.fn().mockResolvedValue(null)
const resetProjectsSpy = jest.fn()
const resetWorkflowsSpy = jest.fn()
const resetGroupsSpy = jest.fn()
const resetTransciptionsSpy = jest.fn()

describe('AppStore', function () {
  beforeAll(function() {
    appStore = AppStore.create()
    Object.defineProperty(
      appStore.client, 'initialize',
      { writable: true, value: initializeSpy }
    )
    Object.defineProperty(
      appStore.auth, 'checkCurrent',
      { writable: true, value: checkCurrentSpy }
    )
    Object.defineProperty(
      appStore.projects, 'selectProject',
      { writable: true, value: selectProjectSpy }
    )
    Object.defineProperty(
      appStore.workflows, 'selectWorkflow',
      { writable: true, value: selectWorkflowSpy }
    )
    Object.defineProperty(
      appStore.groups, 'selectGroup',
      { writable: true, value: selectGroupSpy }
    )
    Object.defineProperty(
      appStore.transcriptions, 'selectTranscription',
      { writable: true, value: selectTranscriptionSpy }
    )
  })

  it('should exist', function () {
    expect(appStore).toBeDefined()
  })

  describe('initialize function', function () {
    beforeAll(async function() {
      await appStore.initialize()
    })

    it('should initialize the client', function () {
      expect(initializeSpy).toHaveBeenCalled()
    })

    it('should check the current user', function () {
      expect(checkCurrentSpy).toHaveBeenCalled()
    })

    it('should set initialized to true', function () {
      expect(appStore.initialized).toBe(true)
    })
  })

  describe('getResources function', function () {
    it('should retrieve missing resources', async function () {
      await appStore.getResources(params)
      expect(selectProjectSpy).toHaveBeenCalled()
      expect(selectWorkflowSpy).toHaveBeenCalled()
      expect(selectGroupSpy).toHaveBeenCalled()
      expect(selectTranscriptionSpy).toHaveBeenCalled()
      jest.clearAllMocks()
    })

    it('should reset resources without params', async function () {
      Object.defineProperty(
        appStore.projects, 'selectProject',
        { writable: true, value: resetProjectsSpy }
      )
      Object.defineProperty(
        appStore.workflows, 'selectWorkflow',
        { writable: true, value: resetWorkflowsSpy }
      )
      Object.defineProperty(
        appStore.groups, 'selectGroup',
        { writable: true, value: resetGroupsSpy }
      )
      Object.defineProperty(
        appStore.transcriptions, 'selectTranscription',
        { writable: true, value: resetTransciptionsSpy }
      )
      await appStore.getResources({})
      expect(resetProjectsSpy).toHaveBeenCalled()
      expect(resetWorkflowsSpy).toHaveBeenCalled()
      expect(resetGroupsSpy).toHaveBeenCalled()
      expect(resetTransciptionsSpy).toHaveBeenCalled()
    })
  })
})
