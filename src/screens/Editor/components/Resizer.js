import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledIcon = styled(FontAwesomeIcon)`
  :hover {
    cursor: ${props => props.direction === 'row' ? 'col-resize' : 'row-resize'};
  }
`

function mouseDown() {
  console.log('MOUSE DOWN');
}

export default function Resizer({ direction }) {
  const ellipsis = direction === 'row' ? faEllipsisV : faEllipsisH

  return (
    <StyledIcon
      direction={direction}
      icon={ellipsis}
      onMouseDown={mouseDown}
    />
  )
}
