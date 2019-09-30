import { shallow } from 'enzyme'
import React from 'react'
import ZoomInButton from './ZoomInButton'

let wrapper

describe('Component > ZoomInButton', function () {
  beforeEach(function() {
    wrapper = shallow(<ZoomInButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
