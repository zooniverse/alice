import { shallow } from 'enzyme'
import React from 'react'
import ZoomInButtonContainer from './ZoomInButtonContainer'

let wrapper

describe('Component > ZoomInButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ZoomInButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
