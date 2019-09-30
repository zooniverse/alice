import { shallow } from 'enzyme'
import React from 'react'
import WorkflowsPageContainer from './WorkflowsPageContainer'

let wrapper

describe('Component > WorkflowsPageContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<WorkflowsPageContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
