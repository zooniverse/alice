import { shallow } from 'enzyme'
import React from 'react'
import * as mod from 'store/AppStore'
import UndoButtonContainer from './UndoButtonContainer'

let wrapper
const undoSpy = jest.fn()

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<UndoButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call on undo', function () {
    mod.undoManager = {
      canUndo: true,
      undo: undoSpy
    }
    wrapper.props().onClick()
    expect(undoSpy).toHaveBeenCalled()
  })
})
