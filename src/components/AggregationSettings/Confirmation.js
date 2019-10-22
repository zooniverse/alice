import React from 'react'
import { Box, Button, Text } from 'grommet'
import { func } from 'prop-types'
import styled from 'styled-components'

const ItalicText = styled(Text)`
  font-style: italic;
`

export default function Confirmation({ callback, setCallback }) {
  return (
    <Box background={{ color: 'white', opacity: '95%' }} fill='vertical' round='xsmall'>
      <Box basis='65%' justify='center' margin='xlarge'>
        <Text weight='bold'>Are you sure?</Text>
        <Text>
          Any custom text rearrangements will be lost by applying these changes.
        </Text>
        <Box direction='row' justify='between' margin={{ top: 'medium' }}>
          <Button onClick={() => { setCallback(null) }} plain>
            <Text size='small'>GO BACK</Text>
          </Button>
          <Button onClick={callback} plain>
            <Text size='small'>YES, APPLY CHANGES</Text>
          </Button>
        </Box>
      </Box>
      <Box basis='35%' margin={{ horizontal: 'xlarge' }}>
        <Text weight='bold'>
          Want to apply these settings to your entire workflow?
        </Text>
        <ItalicText>
          It's quicker to re-download the data from the Lab on Zooniverse.org
        </ItalicText>
      </Box>
    </Box>
  )
}

Confirmation.propTypes = {
  callback: func,
  setCallback: func
}

Confirmation.defaultProps = {
  callback: () => {},
  setCallback: () => {}
}
