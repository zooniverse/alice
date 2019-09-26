import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import Badge from './Badge'

function BadgeContainer () {
  const store = useContext(AppContext)
  const user = store.auth.user

  const name = user && user.display_name
  const signOut = store.auth.logout
  const src = user && user.avatar_src

  return <Badge name={name} signOut={signOut} src={src} />
}

export default observer(BadgeContainer)
