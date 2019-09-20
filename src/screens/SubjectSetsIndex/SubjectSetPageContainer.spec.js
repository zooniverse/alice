import { shallow } from 'enzyme'
import React from 'react'
import SubjectSetPageContainer from './SubjectSetPageContainer'

let wrapper

describe('Component > SubjectSetPageContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SubjectSetPageContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
