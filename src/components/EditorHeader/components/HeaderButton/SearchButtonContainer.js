import React from 'react'
import AppContext from 'store'
import HeaderButton from './HeaderButton'
import MODALS from 'helpers/modals'

export default function SearchButtonContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const onClick = e => store.modal.toggleModal(MODALS.SEARCH)

  return <HeaderButton disabled={disabled} label={'Search'} onClick={onClick} />
}
