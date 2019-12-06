import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import WorkflowFactory from './factories/workflow'

let workflowsStore
let rootStore
const workflowTwo = WorkflowFactory.build({ id: 2 })

let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [WorkflowFactory.build(), workflowTwo]
        })
    }
  )
}
const error = { message: 'Failed to Return' }
let failedToveStub = {
  get: () => Promise.reject(error)
}

describe('WorkflowsStore', function () {
  describe('success state', function () {
    beforeEach(function () {
      rootStore = AppStore.create({
        client: { tove: toveStub }
      })
      workflowsStore = rootStore.workflows
    })

    it('should exist', function () {
      expect(workflowsStore).toBeDefined()
    })

    it('should fetch transcriptions', async function () {
      await workflowsStore.fetchWorkflows()
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.READY)
      expect(workflowsStore.all.length).toBe(2)
    })

    it('should select a workflow', async function () {
      await workflowsStore.fetchWorkflows()
      workflowsStore.selectWorkflow('2')
      expect(workflowsStore.current).toEqual(workflowTwo)
    })

    it('should set the asyncState', function () {
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.IDLE)
      workflowsStore.setState(ASYNC_STATES.READY)
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.READY)
    })

    it('should select a workflow to undefined if none provided', function () {
      workflowsStore.selectWorkflow(null)
      expect(workflowsStore.current).toEqual(undefined)
    })
  })

  describe('failure state', function () {
    it('should handle an error when fetching transcriptions', async function () {
      rootStore = AppStore.create({ client: { tove: failedToveStub }})
      workflowsStore = rootStore.workflows
      await workflowsStore.fetchWorkflows()
      expect(workflowsStore.error).toBe(error.message)
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })
  })
})
