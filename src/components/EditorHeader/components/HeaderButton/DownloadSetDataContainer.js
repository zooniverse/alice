import React from 'react'
import MODALS from 'helpers/modals'
import AppContext from 'store'
import { observer } from 'mobx-react'
import HeaderButton from './HeaderButton'

function DownloadSetDataContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const onClick = () => store.modal.toggleModal(MODALS.DOWNLOAD_GROUP)
  const disableButton = disabled || store.transcriptions.approvedCount === 0

  return (
    <HeaderButton
      disabled={disableButton}
      label='Download Approved Group Data'
      onClick={onClick}
    />
  )
}

export default observer(DownloadSetDataContainer)
