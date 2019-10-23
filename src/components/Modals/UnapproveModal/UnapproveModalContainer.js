import React from 'react'
import AppContext from 'store'
import UnapproveModal from './UnapproveModal'

export default function UnapproveModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')

  return <UnapproveModal onClose={onClose} />
}
