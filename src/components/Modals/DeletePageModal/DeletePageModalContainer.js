import React from 'react'
import AppContext from 'store'
import DeletePageModal from './DeletePageModal'
import CONTENT from './content'
import { getPage } from 'helpers/slopeHelpers'

function lastInstanceOnPage(allKeys, currentKey) {
  let instances = 0
  allKeys.forEach(key => {
    if (getPage(key) === getPage(currentKey)) instances += 1
  })
  return instances <= 1
}

export default function DeletePageModalContainer() {
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onDelete = () => {
    store.transcriptions.deletePage()
    onClose()
  }
  const slopeKeys = store.transcriptions.slopeKeys
  const currentKey = store.transcriptions.currentKey
  const lastInstance = lastInstanceOnPage(slopeKeys, currentKey)
  let content = lastInstance ? CONTENT.withoutDuplicates : CONTENT.withDuplicates

  return (
    <DeletePageModal
      content={content}
      onClose={onClose}
      onDelete={onDelete}
    />
  )
}
