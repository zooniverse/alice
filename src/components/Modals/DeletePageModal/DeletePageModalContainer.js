import React from 'react'
import AppContext from 'store'
import DeletePageModal from './DeletePageModal'
import CONTENT from './content'
import { lastInstanceOnPage } from 'helpers/slopeHelpers'

export default function DeletePageModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onDelete = () => {
    store.transcriptions.deletePage()
    onClose()
  }
  const slopeKeys = store.transcriptions.slopeKeys
  const currentIndex = store.transcriptions.index
  const lastInstance = lastInstanceOnPage(slopeKeys, currentIndex)
  let content = lastInstance ? CONTENT.withoutDuplicates : CONTENT.withDuplicates

  return (
    <DeletePageModal
      content={content}
      onClose={onClose}
      onDelete={onDelete}
    />
  )
}
