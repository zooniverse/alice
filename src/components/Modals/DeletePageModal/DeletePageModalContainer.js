import React from 'react'
import AppContext from 'store'
import DeletePageModal from './DeletePageModal'

export default function DeletePageModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onDelete = () => {
    store.transcriptions.deletePage()
    onClose()
  }


  return (
    <DeletePageModal
      onClose={onClose}
      onDelete={onDelete}
    />
  )
}
