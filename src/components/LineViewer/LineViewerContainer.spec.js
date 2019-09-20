import { shallow } from 'enzyme'
import React from 'react'
import LineViewerContainer from './LineViewerContainer'

let wrapper

describe('Component > LineViewerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<LineViewerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
