import { shallow } from 'enzyme'
import React from 'react'
import LoginFormContainer from './LoginFormContainer'
import LoginForm from './LoginForm'

let wrapper;
let loginForm;

describe('Component > LoginFormContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<LoginFormContainer />)
    loginForm = wrapper.find(LoginForm)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the `LoginForm` component', function () {
    expect(loginForm.length).toBe(1)
  })
})
