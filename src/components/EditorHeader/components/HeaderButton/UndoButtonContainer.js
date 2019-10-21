import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import HeaderButton from './HeaderButton'
import { Refresh } from 'grommet-icons'

function UndoButtonContainer() {
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showSettings

  return (
    <HeaderButton
      disabled={disabled}
      icon={<Refresh color='#555555' size='small'/>}
      label={'Undo'}
      onClick={() => {}}
    />
  )
}

export default observer(UndoButtonContainer)
