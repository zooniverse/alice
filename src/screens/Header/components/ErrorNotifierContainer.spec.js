import { shallow } from 'enzyme'
import React from 'react'
import ErrorNotifierContainer from './ErrorNotifierContainer'

let wrapper

describe('Component > ErrorNotifierContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ErrorNotifierContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
