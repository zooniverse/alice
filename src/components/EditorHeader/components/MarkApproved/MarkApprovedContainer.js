import React from 'react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import { observer } from 'mobx-react'
import MarkApproved from './MarkApproved'

function MarkApprovedContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const isChecked = store.transcriptions.approved
  const onChange = () => {
    if (!isChecked) {
      store.transcriptions.updateApproval(isChecked)
    } else {
      store.modal.toggleModal(MODALS.UNAPPROVED)
    }
  }
  return (
    <MarkApproved
      checked={isChecked}
      disabled={disabled}
      isOwner={store.projects.isOwner}
      onChange={onChange}
    />
  )
}

export default observer(MarkApprovedContainer)
