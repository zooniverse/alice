import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import { Workflow } from './WorkflowsStore'
import WorkflowFactory from './factories/workflow'

let workflowsStore
let rootStore

let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [WorkflowFactory.build(), WorkflowFactory.build()]
        })
    }
  )
}
const error = { message: 'Failed to Return' }
let failedToveStub = {
  get: () => Promise.reject(error)
}

describe('TranscriptionsStore', function () {
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

    it('should select a workflow', function () {
      const workflow = WorkflowFactory.build()
      const outcome = Workflow.create({
        display_name: workflow.attributes.display_name,
        id: workflow.id,
        project_id: workflow.relationships.project.data.id,
        groups: workflow.attributes.groups
      })
      workflowsStore.selectWorkflow(workflow)
      expect(workflowsStore.current).toEqual(outcome)
    })

    it('should set the asyncState', function () {
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.IDLE)
      workflowsStore.setState(ASYNC_STATES.READY)
      expect(workflowsStore.asyncState).toBe(ASYNC_STATES.READY)
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
