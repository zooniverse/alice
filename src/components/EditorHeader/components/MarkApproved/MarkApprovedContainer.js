import React from 'react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import MarkApproved from './MarkApproved'

function MarkApprovedContainer() {
  const store = React.useContext(AppContext)
  const [isChecked, setChecked] = React.useState(false)
  const onChange = () => {
    setChecked(!isChecked)
    store.modal.toggleModal(MODALS.UNAPPROVED)
  }

  return <MarkApproved checked={isChecked} onChange={onChange} />
}

export default MarkApprovedContainer
