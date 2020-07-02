import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import Badge from './Badge'

function BadgeContainer ({ onAbout }) {
  const store = React.useContext(AppContext)
  const [isOpen, setOpen] = React.useState(false)
  const user = store.auth.user

  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const src = user && user.avatar_src
  const signOut = () => {
    if (store.transcriptions.current && !store.transcriptions.lockedByDifferentUser) {
      store.transcriptions.unlockTranscription()
    }
    store.auth.logout()
  }

  return (
    <Badge
      disabled={disabled}
      isOpen={isOpen}
      name={store.auth.userName}
      onAbout={onAbout}
      role={store.projects.role}
      setOpen={setOpen}
      signOut={signOut}
      src={src}
    />
  )
}

export default observer(BadgeContainer)
