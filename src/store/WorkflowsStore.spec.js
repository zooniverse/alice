import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import WorkflowFactory from './factories/workflow'

let workflowsStore
let rootStore
const workflowTwo = WorkflowFactory.build({ id: '2' })

let toveStubArray = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [WorkflowFactory.build(), workflowTwo]
        })
    }
  )
}

let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: workflowTwo,
          meta: {
            pagination: { last: 1 }
          }
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
        client: { tove: toveStubArray }
      })
      workflowsStore = rootStore.workflows
    })

    it('should exist', function () {
      expect(workflowsStore).toBeDefined()
    })

    it('should fetch transcriptions', async function () {
      await workflowsStore.fetchWorkflows()
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.READY)
      expect(workflowsStore.all.size).toBe(2)
    })

    it('should select a workflow', async function () {
      await workflowsStore.fetchWorkflows()
      workflowsStore.selectWorkflow('2')
      expect(workflowsStore.current.id).toBe(workflowTwo.id)
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

    it('should fetch a single workflow', async function () {
      rootStore = AppStore.create({ client: { tove: toveStub }})
      workflowsStore = rootStore.workflows
      const returnValue = await workflowsStore.getWorkflow('1')
      expect(returnValue).toBeDefined()
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.READY)
    })
  })

  describe('failure state', function () {
    beforeEach(function () {
      rootStore = AppStore.create({ client: { tove: failedToveStub }})
      workflowsStore = rootStore.workflows
    })

    it('should handle an error when fetching workflows', async function () {
      await workflowsStore.fetchWorkflows()
      expect(workflowsStore.error).toBe(error.message)
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })

    it('should handle an error when fetching a single workflow', async function () {
      await workflowsStore.getWorkflow('1')
      expect(workflowsStore.error).toBe(error.message)
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })
  })
})
