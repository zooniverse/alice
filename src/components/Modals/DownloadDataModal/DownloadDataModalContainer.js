import React from 'react'
import AppContext from 'store'
import { bool } from 'prop-types'
import DownloadDataModal from './DownloadDataModal'

export default function DownloadDataModalContainer({ entireGroup }) {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onDownload = () => {
    store.client.downloadData(entireGroup)
    onClose()
  }


  return (
    <DownloadDataModal
      approved={store.transcriptions.approvedCount}
      entireGroup={entireGroup}
      onClose={onClose}
      onDownload={onDownload}
      transcriptionCount={store.transcriptions.totalCount}
    />
  )
}

DownloadDataModalContainer.propTypes = {
  entireGroup: bool
}

DownloadDataModalContainer.defaultProps = {
  entireGroup: false
}
