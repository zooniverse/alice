import { shallow } from 'enzyme'
import React from 'react'
import LayoutButtonContainer from './LayoutButtonContainer'

let wrapper
const toggleLayoutSpy = jest.fn()
const contextValues = {
  editor: {
    toggleLayout: toggleLayoutSpy
  }
}

describe('Component > UndoButton', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<LayoutButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should toggle the layout', function () {
    wrapper.props().onClick()
    expect(toggleLayoutSpy).toHaveBeenCalled()
  })
})
