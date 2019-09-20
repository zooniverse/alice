import { shallow } from 'enzyme'
import React from 'react'
import SubjectsPageContainer from './SubjectsPageContainer'

let wrapper

describe('Component > SubjectsPageContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SubjectsPageContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
