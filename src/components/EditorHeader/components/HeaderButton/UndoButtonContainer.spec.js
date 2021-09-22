import { shallow } from 'enzyme'
import * as React from 'react';
import UndoButtonContainer from './UndoButtonContainer'

let wrapper
const undoSpy = jest.fn()
const context = {
  transcriptions: {
    undo: undoSpy
  }
}

describe('Component > UndoButton', function () {
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
