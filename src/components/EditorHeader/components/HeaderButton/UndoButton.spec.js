import { shallow } from 'enzyme'
import React from 'react'
import UndoButton from './UndoButton'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<UndoButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
