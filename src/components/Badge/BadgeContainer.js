import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import Badge from './Badge'

function BadgeContainer () {
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showSettings
  const user = store.auth.user

  const name = user && user.display_name
  const signOut = store.auth.logout
  const src = user && user.avatar_src

  return <Badge disabled={disabled} name={name} signOut={signOut} src={src} />
}

export default observer(BadgeContainer)
