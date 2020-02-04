import React from 'react'
import MODALS from 'helpers/modals'
import AppContext from 'store'
import HeaderButton from './HeaderButton'

export default function DownloadSetDataContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const onClick = () => store.modal.toggleModal(MODALS.DOWNLOAD_GROUP)

  return (
    <HeaderButton
      disabled={disabled}
      label='Download Approved Subject Set Data'
      onClick={onClick}
    />
  )
}
