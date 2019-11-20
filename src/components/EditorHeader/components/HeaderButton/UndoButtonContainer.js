import React from 'react'
import HeaderButton from './HeaderButton'
import { Refresh } from 'grommet-icons'

function UndoButtonContainer({ disabled }) {
  const onClick = () => console.log('Undo Button Clicked');

  return (
    <HeaderButton
      disabled={disabled}
      icon={<Refresh color='#555555' size='small'/>}
      label={'Undo'}
      onClick={onClick}
    />
  )
}

export default UndoButtonContainer
