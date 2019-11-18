import { shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import ResourcesTable from '../../components/ResourcesTable'
import { WorkflowsPageContainer } from './WorkflowsPageContainer'

let wrapper
const fetchWorkflowsSpy = jest.fn()
const pushSpy = jest.fn()
const selectGroupSpy = jest.fn()
const selectWorkflowSpy = jest.fn()
const contextValues = {
  groups: {
    selectGroup: selectGroupSpy
  },
  workflows: {
    asyncState: ASYNC_STATES.IDLE,
    error: 'THIS IS AN ERROR',
    fetchWorkflows: fetchWorkflowsSpy,
    selectWorkflow: selectWorkflowSpy
  }
}
const history = {
  push: pushSpy
}
const match = {
  params: {
    project: 1
  }
}

describe('Component > WorkflowsPageContainer', function () {
  describe('idle state', function () {
    beforeEach(function() {
      jest.spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      wrapper = shallow(<WorkflowsPageContainer history={history} match={match} />);
    })

    afterEach(() => jest.clearAllMocks());

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
    })

    it('should fetch workflows', function () {
      expect(fetchWorkflowsSpy).toHaveBeenCalled()
    })

    it('should call the child onSelection function', function () {
      const workflow = { id: 1 }
      const table = wrapper.find(ResourcesTable).first()
      table.props().onSelection(workflow)
      expect(pushSpy).toHaveBeenCalled()
      expect(selectWorkflowSpy).toHaveBeenCalled()
    })

    it('should pass the error prop', function () {
      const table = wrapper.find(ResourcesTable).first()
      expect(table.props().error).toBe(contextValues.workflows.error)
    })
  })

  it('should not call fetch workflows if already retrieved', function () {
    const copiedContext = Object.assign({}, contextValues)
    copiedContext.workflows.asyncState = ASYNC_STATES.READY
    wrapper = shallow(<WorkflowsPageContainer />);
    expect(fetchWorkflowsSpy).not.toHaveBeenCalled()
  })

  describe('useEffect hook', function () {
    it('should clear the selected project', function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest.spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<WorkflowsPageContainer />);
      expect(selectGroupSpy).toHaveBeenCalledTimes(1)
      expect(selectWorkflowSpy).toHaveBeenCalledTimes(1)
    })
  })
})
