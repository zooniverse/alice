import React from 'react'
import { Box } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { bool, func, string } from 'prop-types'

const StyledBox = styled(Box)`
  :hover {
    cursor: ${props => {
      let icon = props.direction === 'row' ? 'col-resize' : 'row-resize'
      if (props.disabled) icon = 'default'
      return icon
    }};
  }
`

export default function Resizer({ direction, disabled, onMouseDown }) {
  const ellipsis = direction === 'row' ? faEllipsisV : faEllipsisH
  const iconColor = disabled ? 'gray' : 'black'

  return (
    <StyledBox
      align='center'
      direction={direction}
      disabled={disabled}
      justify='center'
      onMouseDown={onMouseDown}
      pad='xsmall'
    >
      <FontAwesomeIcon color={iconColor} icon={ellipsis} />
    </StyledBox>
  )
}

Resizer.propTypes = {
  direction: string,
  disabled: bool,
  onMouseDown: func
}

Resizer.defaultProps = {
  direction: 'row',
  disabled: false,
  onMouseDown: () => {}
}
