import { useRef } from 'react';
import { Box, Button, Drop, Text } from 'grommet'
import { bool, func } from 'prop-types'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFlag } from '@fortawesome/free-solid-svg-icons'

const StyledButton = styled(Button)`
  display: flex;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
  ${css`opacity: ${props => props.dim ? 0.25 : 1};`}
`

function FlagButton({ disabled, onShowFlag, setFlag, showFlag, seenButton, tag }) {
  const flagBtn = useRef(null)
  const color = seenButton ? 'green' : 'tomato'
  const icon = seenButton ? faCircle : faFlag
  const text = seenButton ? 'MARK AS SEEN' : 'FLAG'

  return (
    <Box align='center'>
      <StyledButton
        disabled={disabled}
        label={
          <StyledFontAwesomeIcon
            color={color}
            dim={!tag ? 1 : 0}
            icon={icon}
            size='xs'
          />
        }
        onClick={setFlag}
        onMouseOver={() => !disabled && onShowFlag(true)}
        onMouseOut={() => !disabled && onShowFlag(false)}
        plain
        ref={flagBtn}
      />
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
  disabled: bool,
  onShowFlag: func,
  seenButton: bool,
  setFlag: func,
  showFlag: bool,
  tag: bool
}

FlagButton.defaultProps = {
  disabled: false,
  onShowFlag: () => {},
  seenButton: false,
  setFlag: () => {},
  showFlag: false,
  tag: false
}

export { StyledButton, StyledFontAwesomeIcon }
export default FlagButton
