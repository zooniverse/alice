import { shallow } from 'enzyme'
import React from 'react'
import { SubjectLockedModalContainer } from './SubjectLockedModalContainer'

describe('Component > SubjectLockedModalContainer', function () {
  let wrapper
  const toggleModalSpy = jest.fn()
  const pushSpy = jest.fn()
  let history = {
    location: {
      pathname: '/projects/123/workflows/123/groups/123/subjects/123/edit'
    },
    push: pushSpy
  }
  const contextValues = {
    modal: {
      toggleModal: toggleModalSpy,
    },
    transcriptions: {
      current: { locked_by: 'A_USER' }
    }
  }

  beforeEach(function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<SubjectLockedModalContainer history={history} />);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call onBack when child prop triggered', function () {
    wrapper.props().onBack()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
    expect(pushSpy).toHaveBeenCalled()
  })

  it('should not change history when not on the edit screen', function () {
    history.location.pathname = '/projects'
    wrapper = shallow(<SubjectLockedModalContainer history={history} />);
    wrapper.props().onBack()
    expect(pushSpy).not.toHaveBeenCalled()
  })
})
