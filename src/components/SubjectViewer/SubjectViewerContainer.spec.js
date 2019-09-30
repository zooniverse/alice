import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewerContainer from './SubjectViewerContainer'

let wrapper

describe('Component > SubjectViewerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SubjectViewerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
