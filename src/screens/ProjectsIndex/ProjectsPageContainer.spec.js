import { shallow } from 'enzyme'
import React from 'react'
import ProjectsPageContainer from './ProjectsPageContainer'

let wrapper

describe('Component > ProjectsPageContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ProjectsPageContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
