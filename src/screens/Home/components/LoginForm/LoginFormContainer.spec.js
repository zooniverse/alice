import { shallow } from 'enzyme'
import React from 'react'
import LoginFormContainer from './LoginFormContainer'
import LoginForm from './LoginForm'

describe('Component > LoginFormContainer', function () {
  let wrapper
  let loginForm
  let loginSpy = jest.fn()

  const contextValues = {
    auth: {
      error: 'Error!',
      login: loginSpy,
    }
  }

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

  it('should call the login prop', function () {
    const fakeEvent = { login: '', password: '' }
    loginForm.props().onSubmit(fakeEvent, { setSubmitting: true })
    expect(loginSpy).toHaveBeenCalled()
  })
})
