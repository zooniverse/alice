import { shallow } from 'enzyme'
import React from 'react'
import ErrorNotifierContainer from './ErrorNotifierContainer'

describe('Component > ErrorNotifierContainer', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<ErrorNotifierContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
