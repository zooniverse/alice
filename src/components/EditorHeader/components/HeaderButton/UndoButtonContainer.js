import React from 'react'
import { Refresh } from 'grommet-icons'
import { undoManager } from 'store/AppStore'
import { observer } from 'mobx-react'
import HeaderButton from './HeaderButton'

function UndoButtonContainer({ disabled }) {
  const onUndo = () => undoManager.canUndo && undoManager.undo()
  const disableUndo = disabled || !undoManager.canUndo

  return (
    <HeaderButton
      disabled={disableUndo}
      icon={<Refresh color='#555555' size='small'/>}
      label='Undo'
      onClick={onUndo}
    />
  )
}

export default observer(UndoButtonContainer)
