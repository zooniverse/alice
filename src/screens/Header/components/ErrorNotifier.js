import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
  z-index: 5;
`

export default function ErrorNotifier() {
  return (
    <RelativeBox>
      <AbsoluteBox background='#E45950' direction='row' height='4em' fill='horizontal'>
        <Box align='center' justify='center' fill='horizontal'>
          <Text color='white' weight='bold'>Internet Connection Lost</Text>
          <Text color='white'>Your changes have been saved but will not be synced until reconnection</Text>
        </Box>
        <Button
          icon={<FontAwesomeIcon color='white' icon={faTimesCircle} />}
          margin='small'
          plain
        />
      </AbsoluteBox>
    </RelativeBox>
  )
}
