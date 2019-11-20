import React from 'react'
import HeaderButton from './HeaderButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

function SaveButtonContainer({ disabled }) {
  const onClick = () => console.log('Save Button Clicked');

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
