import { shallow } from 'enzyme'
import React from 'react'

import LoginForm from './LoginForm'

let wrapper

describe('Component > LoginForm', function () {
  beforeEach(function () {
    wrapper = shallow(<LoginForm />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
