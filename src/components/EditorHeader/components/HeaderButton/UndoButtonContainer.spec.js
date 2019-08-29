import { shallow } from 'enzyme'
import React from 'react'
import UndoButtonContainer from './UndoButtonContainer'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<UndoButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
