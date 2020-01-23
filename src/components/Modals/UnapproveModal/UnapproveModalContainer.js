import React from 'react'
import AppContext from 'store'
import UnapproveModal from './UnapproveModal'

export default function UnapproveModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onUnapprove = () => {
    store.transcriptions.updateApproval(true)
    onClose()
  }

  return (
    <UnapproveModal
      onClose={onClose}
      onUnapprove={onUnapprove}
    />
  )
}
