import React from 'react'
import AppContext from 'store'
import HeaderButton from './HeaderButton'

export default function SearchButtonContainer() {
  const store = React.useContext(AppContext)
  const onClick = e => store.modal.toggleModal('search')

  return <HeaderButton label={'Search'} onClick={onClick} />
}
