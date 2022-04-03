import { shallow } from 'enzyme'
import React from 'react'
import Footer from './Footer'

describe('Component > Footer', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<Footer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
