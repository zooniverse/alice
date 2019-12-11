import { shallow } from 'enzyme'
import React from 'react'
import Home from './Home'

let wrapper

describe('Component > Home', function () {
  beforeEach(function () {
    wrapper = shallow(<Home />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
