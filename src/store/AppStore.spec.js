import { AppStore } from './AppStore'

describe('AppStore', function () {
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
  const selectGroupsSpy = jest.fn()
  const resetTransciptionsSpy = jest.fn()

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

  describe.skip('initialize function', function () {
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
    it.skip('should retrieve missing resources', async function () {
      await appStore.getResources(params)
      expect(selectProjectSpy).toHaveBeenCalled()
      expect(selectWorkflowSpy).toHaveBeenCalled()
      expect(selectGroupSpy).toHaveBeenCalled()
      expect(selectTranscriptionSpy).toHaveBeenCalled()
      jest.clearAllMocks()
    })

    it('should reset resources without params', async function () {
      Object.defineProperty(
        appStore.groups, 'selectGroup',
        { writable: true, value: selectGroupsSpy }
      )
      Object.defineProperty(
        appStore.transcriptions, 'reset',
        { writable: true, value: resetTransciptionsSpy }
      )
      await appStore.getResources({})
      expect(selectProjectSpy).toHaveBeenCalled()
      expect(selectWorkflowSpy).toHaveBeenCalled()
      expect(selectGroupsSpy).toHaveBeenCalled()
      expect(resetTransciptionsSpy).toHaveBeenCalled()
    })
  })
})
