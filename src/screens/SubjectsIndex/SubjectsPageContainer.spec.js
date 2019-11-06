import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import { SubjectsPageContainer } from './SubjectsPageContainer'
import ResourcesTable from '../../components/ResourcesTable'

let wrapper
const pushSpy = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  }
}
const history = {
  location: {
    pathname: '/projects/123/workflows/123/subject-sets/123/subjects/123/edit'
  },
  push: pushSpy
}
const match = {
  params: {
    project: '123',
    workflow: '123',
    subjectSet: '123',
    subject: '123'
  }
}

describe('Component > SubjectsPageContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(
      <SubjectsPageContainer
        history={history}
        match={match}
      />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should toggleModal when subject locked', function() {
    const mockDatum = { locked: true }
    const table = wrapper.find(ResourcesTable).first()
    table.props().onSelection(mockDatum)
    expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.LOCKED)
    expect(pushSpy).toHaveBeenCalled()
  })

  it('should not toggleModal when subject unlocked', function() {
    const mockDatum = { locked: false }
    const table = wrapper.find(ResourcesTable).first()
    table.props().onSelection(mockDatum)
    expect(toggleModalSpy).not.toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalled()
  })
})
