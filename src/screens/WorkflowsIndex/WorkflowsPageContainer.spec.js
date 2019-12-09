import { mount, shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import { act } from 'react-dom/test-utils';
import ResourcesTable from '../../components/ResourcesTable'
import { WorkflowsPageContainer } from './WorkflowsPageContainer'

let wrapper
const fetchWorkflowsSpy = jest.fn()
const pushSpy = jest.fn()
const getResourcesSpy = jest.fn()
const selectWorkflowSpy = jest.fn()
const contextValues = {
  getResources: getResourcesSpy,
  workflows: {
    all: [],
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

    it('should call the child onSelection function', function () {
      const workflow = { id: 1 }
      const table = wrapper.find(ResourcesTable).first()
      table.props().onSelection(workflow)
      expect(pushSpy).toHaveBeenCalled()
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
    it('should fetch resources', async function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      wrapper = mount(<WorkflowsPageContainer history={history} match={match} />);
      await act(async() => {
        wrapper.update()
      })
      expect(getResourcesSpy).toHaveBeenCalledTimes(1)
      expect(fetchWorkflowsSpy).toHaveBeenCalledTimes(1)
    })
  })
})
