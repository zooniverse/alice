import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import DeleteModal from './DeleteModal'

function DeleteModalContainer({ toggleModal }) {
  const store = React.useContext(AppContext)

  return (
    <DeleteModal toggleModal={toggleModal} />
  )
}

export default observer(DeleteModalContainer)
