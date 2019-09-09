import React from 'react'

import { storiesOf } from '@storybook/react'
import { Box, Grommet } from 'grommet'
import merge from 'lodash/merge'
import zooTheme from '@zooniverse/grommet-theme'
import FilmstripViewerContainer from './FilmstripViewerContainer'
import AggregatedTranscriptions from '../src/components/AggregatedTranscriptions'
import baseTheme from '../src/theme'

const mergedTheme = merge({}, zooTheme, baseTheme)

storiesOf('FilmstripViewer', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <FilmstripViewerContainer />
      </Box>
    </Grommet>
  ))

storiesOf('AggregatedTranscriptions', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <AggregatedTranscriptions />
      </Box>
    </Grommet>
  ))
