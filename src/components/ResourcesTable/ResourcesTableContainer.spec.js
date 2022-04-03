import { shallow } from 'enzyme'
import React from 'react'
import ResourcesTableContainer from './ResourcesTableContainer'

describe('Component > ResourcesTableContainer', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<ResourcesTableContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
