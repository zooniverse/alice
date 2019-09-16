import { shallow } from 'enzyme'
import React from 'react'
import LineViewer from './LineViewer'

let wrapper;

describe('Component > LineViewer', function () {
  beforeEach(function() {
    wrapper = shallow(<LineViewer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
