import React from 'react'
import { Box, Button, Drop, Text } from 'grommet'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFlag } from '@fortawesome/free-solid-svg-icons'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
  opacity: ${props => props.dim ? 0.5 : 1};
`

function FlagButton({ onShowFlag, setFlag, showFlag, seenButton }) {
  const flagBtn = React.useRef(null)
  const color = seenButton ? 'green' : 'tomato'
  const icon = seenButton ? faCircle : faFlag
  const text = seenButton ? 'MARK AS SEEN' : 'FLAG'

  return (
    <Box>
      <Button
        onClick={setFlag}
        onMouseOver={() => onShowFlag(true)}
        onMouseOut={() => onShowFlag(false)}
        plain
        ref={flagBtn}
      >
        <StyledFontAwesomeIcon
          color={color}
          dim='true'
          icon={icon}
          size='xs'
        />
      </Button>
      {showFlag && (
        <Drop
          align={{ right: 'right', top: 'bottom' }}
          plain
          target={flagBtn.current}
        >
          <Box
            align='center'
            background='light-3'
            direction='row'
            elevation='medium'
            gap='0.25em'
            margin='0.5em'
            pad='xsmall'
            round='xsmall'
          >
            <StyledFontAwesomeIcon color={color} icon={icon} size='xs' />
            <Text>{text}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  )
}

FlagButton.propTypes = {
  onShowFlag: func,
  seenButton: bool,
  setFlag: func,
  showFlag: bool
}

FlagButton.defaultProps = {
  onShowFlag: () => {},
  seenButton: false,
  setFlag: () => {},
  showFlag: false
}

export default FlagButton
