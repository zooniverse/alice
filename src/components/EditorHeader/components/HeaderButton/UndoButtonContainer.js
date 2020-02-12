import React from 'react'
import { Refresh } from 'grommet-icons'
import { undoManager } from 'store/AppStore'
import HeaderButton from './HeaderButton'

function UndoButtonContainer({ disabled }) {
  const onClick = () => {
    console.log(undoManager.canUndo);
    undoManager.canUndo && undoManager.undo()
  }

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
