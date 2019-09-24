import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import Badge from './Badge'

function BadgeContainer () {
  const store = React.useContext(AppContext)
  const user = store.auth.user
  const name = user && user.display_name
  const src = user && user.avatar_src

  return (
    <Badge name={name} src={src} />
  )
}

export default observer(BadgeContainer)
