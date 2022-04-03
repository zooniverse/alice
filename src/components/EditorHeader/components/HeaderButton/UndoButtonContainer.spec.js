import { shallow } from 'enzyme'
import React from 'react'
import UndoButtonContainer from './UndoButtonContainer'

describe('Component > UndoButton', function () {
  let wrapper
  const undoSpy = jest.fn()
  const context = {
    transcriptions: {
      undo: undoSpy
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => context)
    wrapper = shallow(<UndoButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call undo', function () {
    wrapper.props().onClick()
    expect(undoSpy).toHaveBeenCalled()
  })
})
