import { shallow } from 'enzyme'
import React from 'react'
import ZoomOutButton from './ZoomOutButton'

let wrapper

describe('Component > ZoomOutButton', function () {
  beforeEach(function() {
    wrapper = shallow(<ZoomOutButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
