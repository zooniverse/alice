import { shallow } from 'enzyme'
import * as React from 'react';
import ResourcesTable from '../../components/ResourcesTable'
import { GroupsPageContainer } from './GroupsPageContainer'

let wrapper
const getResourcesSpy = jest.fn()
const selectGroupSpy = jest.fn()
const setPageSpy = jest.fn()
const pushSpy = jest.fn()
const contextValues = {
  getResources: getResourcesSpy,
  groups: {
    all: [],
    selectGroup: selectGroupSpy,
    setPage: setPageSpy
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

describe('Component > GroupsPageContainer', function () {
  beforeEach(function() {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<GroupsPageContainer history={history} match={match} />);
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

  it('child should call setPage', function () {
    const table = wrapper.find(ResourcesTable).first()
    table.props().setStep(1);
    expect(setPageSpy).toHaveBeenCalled()
  })

  describe('useEffect hook', function () {
    it('should clear the selected project', function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest.spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<GroupsPageContainer match={match} />);
      expect(getResourcesSpy).toHaveBeenCalledTimes(1)
    })
  })
})
