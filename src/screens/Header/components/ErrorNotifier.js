import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import { bool, func, shape, string } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const AbsoluteBox = styled(Box)`
  position: absolute;
  z-index: 5;
`

export const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const RelativeBox = styled(Box)`
  position: relative;
`

export default function ErrorNotifier({ error, showNotifier, toggleError }) {
  if (!showNotifier) return null

  return (
    <RelativeBox>
      <AbsoluteBox background='#E45950' direction='row' height='4em' fill='horizontal'>
        <Box align='center' justify='center' fill='horizontal'>
          <CapitalText color='white' weight='bold'>{error && error.message}</CapitalText>
          <Text color='white'>{error && error.help}</Text>
        </Box>
        <Button
          icon={<FontAwesomeIcon color='white' icon={faTimesCircle} />}
          margin='small'
          onClick={toggleError}
          plain
        />
      </AbsoluteBox>
    </RelativeBox>
  )
}

ErrorNotifier.propTypes = {
  error: shape({
    help: string,
    message: string
  }),
  showNotifier: bool,
  toggleError: func
}

ErrorNotifier.defaultProps = {
  error: null,
  showNotifier: false,
  toggleError: () => {}
}
