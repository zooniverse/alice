import { shallow } from 'enzyme'
import React from 'react'
import LayoutButtonContainer from './LayoutButtonContainer'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<LayoutButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
