import React from 'react'
import HeaderButton from './HeaderButton'
import { observer } from 'mobx-react'
import AppContext from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

function SaveButtonContainer() {
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showSettings

  return (
    <HeaderButton
      disabled={disabled}
      icon={<FontAwesomeIcon color='#555555' icon={faSave} size='xs' />}
      label={'Save'}
      onClick={() => {}}
    />
  )
}

export default observer(SaveButtonContainer)
