import React from 'react'
import AppContext from 'store'
import MoreButton from './MoreButton'

export default function MoreButtonContainer() {
  const store = React.useContext(AppContext)
  const [isOpen, setOpen] = React.useState(false)
  const toggleDownload = () => store.modal.toggleModal('download')

  return (
    <MoreButton
      isOpen={isOpen}
      setOpen={setOpen}
      toggleDownload={toggleDownload}
    />
  )
}
