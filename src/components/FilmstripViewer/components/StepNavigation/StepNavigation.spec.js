import { shallow } from 'enzyme'
import React from 'react'
import StepNavigation from './StepNavigation'

let wrapper

describe('Component > StepNavigation', function () {
  beforeEach(function() {
    wrapper = shallow(<StepNavigation />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
