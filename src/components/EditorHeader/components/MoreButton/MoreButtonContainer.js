import React from 'react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import MoreButton from './MoreButton'

export default function MoreButtonContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const [isOpen, setOpen] = React.useState(false)
  const toggleDownload = () => store.modal.toggleModal(MODALS.DOWNLOAD)

  return (
    <MoreButton
      disabled={disabled}
      isOpen={isOpen}
      setOpen={setOpen}
      toggleDownload={toggleDownload}
    />
  )
}
