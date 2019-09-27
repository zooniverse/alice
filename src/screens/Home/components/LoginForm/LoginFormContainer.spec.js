import { shallow } from 'enzyme'
import React from 'react'
import LoginFormContainer from './LoginFormContainer'
import LoginForm from './LoginForm'

let wrapper
let loginForm

const contextValues = {
  auth: {
    error: 'Error!',
    login: (e) => {},
  }
}

describe('Component > LoginFormContainer', function () {
  beforeEach(function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<LoginFormContainer />)
    loginForm = wrapper.find(LoginForm)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the `LoginForm` component', function () {
    expect(loginForm.length).toBe(1)
  })

  it('should pass the error prop', function () {
    const error = loginForm.props().error
    expect(error).toBe(contextValues.auth.error)
    expect(typeof error).toBe('string')
  })

  it('should pass the login prop', function () {
    const login = loginForm.props().onSubmit
    expect(login).toBeDefined()
    expect(login).toBeInstanceOf(Function)
  })
})
