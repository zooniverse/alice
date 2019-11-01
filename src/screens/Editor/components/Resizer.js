import React from 'react'
import { Box } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const StyledBox = styled(Box)`
  :hover {
    cursor: ${props => props.direction === 'row' ? 'col-resize' : 'row-resize'};
  }
`

export default function Resizer({ direction, onMouseDown }) {
  const ellipsis = direction === 'row' ? faEllipsisV : faEllipsisH

  return (
    <StyledBox
      align='center'
      direction={direction}
      justify='center'
      onMouseDown={onMouseDown}
      pad='xsmall'
    >
      <FontAwesomeIcon icon={ellipsis} />
    </StyledBox>
  )
}

Resizer.propTypes = {
  direction: string,
  onMouseDown: func
}

Resizer.defaultProps = {
  direction: 'row',
  onMouseDown: () => {}
}
