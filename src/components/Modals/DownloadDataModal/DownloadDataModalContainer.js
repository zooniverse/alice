import React from 'react'
import AppContext from 'store'
import DownloadDataModal from './DownloadDataModal'

export default function DownloadDataModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')

  return <DownloadDataModal onClose={onClose} />
}
