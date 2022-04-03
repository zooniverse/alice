import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewerHeaderContainer from './SubjectViewerHeaderContainer'

describe('Component > SubjectViewerHeaderContainer', function () {
  let wrapper
  const toggleLineVisibilitySpy = jest.fn()
  const contextValues = {
    editor: {
      linesVisible: true,
      toggleLineVisibility: toggleLineVisibilitySpy
    },
    transcriptions: {
      isActive: false
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues)
    wrapper = shallow(<SubjectViewerHeaderContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the toogleLineVisibility function', function () {
    wrapper.props().toggleLineVisibility()
    expect(toggleLineVisibilitySpy).toHaveBeenCalled()
  })
})
