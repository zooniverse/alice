import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Grommet } from 'grommet'
import AggregatedTranscriptionsContainer from './AggregatedTranscriptionsContainer'
import { mergedTheme } from '../../theme'

storiesOf('AggregatedTranscriptions', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <AggregatedTranscriptionsContainer />
      </Box>
    </Grommet>
  ))
