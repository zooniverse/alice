import { shallow } from 'enzyme'
import React from 'react'
import Home from './Home'

describe('Component > Home', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<Home />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
