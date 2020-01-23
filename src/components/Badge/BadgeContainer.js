import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import Badge from './Badge'

function BadgeContainer ({ onAbout }) {
  const store = React.useContext(AppContext)
  const [isOpen, setOpen] = React.useState(false)
  const user = store.auth.user

  const disabled = store.aggregations.showModal
  const name = user && user.display_name
  const signOut = store.auth.logout
  const src = user && user.avatar_src

  return (
    <Badge
      disabled={disabled}
      isOpen={isOpen}
      name={name}
      onAbout={onAbout}
      role={store.projects.role}
      setOpen={setOpen}
      signOut={signOut}
      src={src}
    />
  )
}

export default observer(BadgeContainer)
