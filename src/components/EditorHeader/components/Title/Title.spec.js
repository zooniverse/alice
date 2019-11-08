import { shallow } from 'enzyme'
import React from 'react'
import Title from './Title'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<Title />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
