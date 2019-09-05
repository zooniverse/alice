import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import FilmstripViewerContainer from './FilmstripViewerContainer'
import AggregatedTranscriptions from '../src/components/AggregatedTranscriptions'
import zooTheme from '@zooniverse/grommet-theme'

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
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <AggregatedTranscriptions />
      </Box>
    </Grommet>
  ))
