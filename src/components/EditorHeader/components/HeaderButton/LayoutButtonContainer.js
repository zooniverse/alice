import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import AppContext from 'store'
import HeaderButton from './HeaderButton'

function LayoutButtonContainer() {
  const store = React.useContext(AppContext)
  const onClick = e => { store.editor.toggleLayout() }
  const disabled = store.aggregations.showSettings
  const rowShade = store.editor.layout === 'row' ? '#555555' : '#CCCCCC'
  const columnShade = store.editor.layout === 'column' ? '#555555' : '#CCCCCC'

  return (
    <HeaderButton
      disabled={disabled}
      icon={
        <Box direction='row' gap='xxsmall'>
          <FontAwesomeIcon color={rowShade} icon={faPause} size='xs' />
          <FontAwesomeIcon color={columnShade} icon={faPause} rotation={90} size='xs' />
        </Box>
      }
      label={'Layout'}
      onClick={onClick}
    />
  )
}

export default observer(LayoutButtonContainer)
