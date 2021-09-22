import { Box } from 'grommet'
import styled from 'styled-components'
import { shape } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFlag, faStar } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
`

const Flags = observer(function Flags({ datum }) {
  return (
    <Box justify='center' direction='row' wrap>
      <Box align='center' direction='row' justify='center'>
        {datum.seen && <StyledFontAwesomeIcon color='green' icon={faCircle} size='xs' />}
        {datum.flagged && <StyledFontAwesomeIcon color='tomato' icon={faFlag} size='xs' />}
      </Box>
      <Box>
        {datum.goldStandard && <FontAwesomeIcon color='gold' icon={faStar} size='xs' />}
      </Box>
    </Box>
  )
})

Flags.propTypes = {
  datum: shape()
}

Flags.defaultProps = {
  datum: {}
}

export { Flags, StyledFontAwesomeIcon }
