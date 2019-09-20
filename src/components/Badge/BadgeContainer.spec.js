import { shallow } from 'enzyme'
import React from 'react'
import BadgeContainer from './BadgeContainer'

let wrapper

describe('Component > BadgeContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<BadgeContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
