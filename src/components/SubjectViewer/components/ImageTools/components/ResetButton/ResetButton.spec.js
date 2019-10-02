import { shallow } from 'enzyme'
import React from 'react'
import ResetButton from './ResetButton'

let wrapper

describe('Component > ResetButton', function () {
  beforeEach(function() {
    wrapper = shallow(<ResetButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
