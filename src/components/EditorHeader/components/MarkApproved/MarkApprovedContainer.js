import React from 'react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import { observer } from 'mobx-react'
import MarkApproved from './MarkApproved'

function MarkApprovedContainer() {
  const store = React.useContext(AppContext)
  const isAdmin = store.projects.isAdmin
  const isChecked = isAdmin ?
    store.transcriptions.approved :
    (store.transcriptions.approved || store.transcriptions.readyForReview)
  const onChangeAsResearcher = () => {
    if (!isChecked) {
      store.transcriptions.updateApproval(isChecked)
    } else {
      store.modal.toggleModal(MODALS.UNAPPROVED)
    }
  }
  const onChangeAsVolunteer = () => store.transcriptions.updateApproval(isChecked)
  const onChange = isAdmin ? onChangeAsResearcher : onChangeAsVolunteer

  return (
    <MarkApproved
      checked={isChecked}
      disabled={store.transcriptions.isActive}
      isAdmin={store.projects.isAdmin}
      onChange={onChange}
    />
  )
}

export default observer(MarkApprovedContainer)
