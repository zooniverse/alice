import { shallow } from 'enzyme'
import React from 'react'
import DeleteModalContainer from './DeleteModalContainer'

describe('Component > DeleteModalContainer', function () {
  let wrapper
  const deleteCurrentLineSpy = jest.fn()
  const toggleModalSpy = jest.fn()

  const context = {
    transcriptions: {
      deleteCurrentLine: deleteCurrentLineSpy
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => context)
    wrapper = shallow(<DeleteModalContainer toggleModal={toggleModalSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call deleteCurrentLine', function () {
    wrapper.props().deleteLine()
    expect(deleteCurrentLineSpy).toHaveBeenCalled()
  })

  it('should call toggleModal', function () {
    wrapper.props().toggleModal()
    expect(toggleModalSpy).toHaveBeenCalled()
  })
})
