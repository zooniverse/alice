import React from 'react'
import HeaderButton from './HeaderButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import AppContext from 'store'

function SaveButtonContainer({ disabled }) {
  const store = React.useContext(AppContext)
  const onClick = () => store.transcriptions.saveTranscription()

  return (
    <HeaderButton
      disabled={disabled}
      icon={<FontAwesomeIcon color='#555555' icon={faSave} size='xs' />}
      label={'Save'}
      onClick={onClick}
    />
  )
}

export default SaveButtonContainer
