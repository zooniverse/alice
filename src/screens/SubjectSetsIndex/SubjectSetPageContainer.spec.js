import { shallow } from 'enzyme'
import React from 'react'
import ResourcesTable from '../../components/ResourcesTable'
import { SubjectSetPageContainer } from './SubjectSetPageContainer'

let wrapper
const selectGroupSpy = jest.fn()
const pushSpy = jest.fn()
const contextValues = {
  groups: {
    selectGroup: selectGroupSpy
  }
}
const history = { push: pushSpy }
const match = {
  params: {
    project: 1,
    workflow: 1
  }
}

describe('Component > SubjectSetPageContainer', function () {
  beforeEach(function() {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<SubjectSetPageContainer history={history} match={match} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('child should call onSelection', function () {
    const table = wrapper.find(ResourcesTable).first()
    const group = { id: 1 }
    table.props().onSelection(group);
    expect(selectGroupSpy).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalled()
  })
})
