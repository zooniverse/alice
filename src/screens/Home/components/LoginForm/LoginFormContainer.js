import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import LoginForm from './LoginForm'

function LoginFormContainer () {
  const store = React.useContext(AppContext)
  const onSubmit = (e, { setSubmitting }) => {
    store.auth.login(e.login, e.password, setSubmitting)
  }

  return (
    <LoginForm
      error={store.auth.error}
      initialValues={{ login: '', password: '' }}
      onSubmit={onSubmit}
    />
  )
}

export default observer(LoginFormContainer)
