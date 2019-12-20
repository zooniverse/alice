import React from 'react'
import AppContext from 'store'
import UnapproveModal from './UnapproveModal'

export default function UnapproveModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const role = store.projects.role

  return <UnapproveModal onClose={onClose} role={role} />
}
