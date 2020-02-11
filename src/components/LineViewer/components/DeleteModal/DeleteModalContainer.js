import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import DeleteModal from './DeleteModal'

function DeleteModalContainer({ toggleModal }) {
  const store = React.useContext(AppContext)
  const deleteLine = () => store.transcriptions.deleteCurrentLine()

  return (
    <DeleteModal
      deleteLine={deleteLine}
      toggleModal={toggleModal}
    />
  )
}

export default observer(DeleteModalContainer)
