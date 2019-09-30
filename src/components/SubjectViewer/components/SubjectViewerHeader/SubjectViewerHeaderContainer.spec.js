import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewerHeaderContainer from './SubjectViewerHeaderContainer'

let wrapper

describe('Component > SubjectViewerHeaderContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SubjectViewerHeaderContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
