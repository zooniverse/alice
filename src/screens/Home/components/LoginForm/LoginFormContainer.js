import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import AppContext from 'store'
import LoginForm from './LoginForm'

export default function LoginFormContainer() {
  const store = React.useContext(AppContext)
  const localStore = useLocalStore(() => ({
    onSubmit: store.auth.login
  }))

  return useObserver(() => (
    <LoginForm
      initialValues={{ login: '', password: '' }}
      onSubmit={localStore.onSubmit}
    />
  ))
}
