import { shallow } from 'enzyme'
import React from 'react'
import ResourcesTable from '../../components/ResourcesTable'
import { SubjectSetPageContainer } from './SubjectSetPageContainer'

let wrapper
const getResourcesSpy = jest.fn()
const pushSpy = jest.fn()
const contextValues = {
  getResources: getResourcesSpy,
  groups: {
    all: { values: () => [] }
  }
}
const history = { push: pushSpy }
const match = {
  params: {
    group: 1,
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

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('child should call onSelection', function () {
    const table = wrapper.find(ResourcesTable).first()
    const group = { id: 1 }
    table.props().onSelection(group);
    expect(pushSpy).toHaveBeenCalled()
  })

  describe('useEffect hook', function () {
    it('should clear the selected project', function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest.spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<SubjectSetPageContainer match={match} />);
      expect(getResourcesSpy).toHaveBeenCalledTimes(1)
    })
  })
})
