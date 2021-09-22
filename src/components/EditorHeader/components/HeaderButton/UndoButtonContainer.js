import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { undoManager } from 'store/AppStore'
import { observer } from 'mobx-react'
import AppContext from 'store'
import HeaderButton from './HeaderButton'

function UndoButtonContainer({ disabled }) {
  const store = useContext(AppContext)
  const onUndo = () => store.transcriptions.undo()
  const disableUndo = disabled || !undoManager.canUndo

  return (
    <HeaderButton
      disabled={disableUndo && !store.transcriptions.isActive}
      icon={<FontAwesomeIcon color='#555555' icon={faRedo} size='xs' />}
      label='Undo'
      onClick={onUndo}
    />
  )
}

export default observer(UndoButtonContainer)
