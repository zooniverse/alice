import React, { Component } from 'react'
import LoginForm from './LoginForm'

class LoginFormContainer extends Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    console.log("Hello World");
  }

  render() {
    return (
      <LoginForm initialValues={{ login: '', password: '' }} onSubmit={this.onSubmit}/>
    )
  }
}

export default LoginFormContainer
