import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import zooTheme from '@zooniverse/grommet-theme'
import FilmstripViewer from './FilmstripViewer'

storiesOf('FilmstripViewer', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <FilmstripViewer />
      </Box>
    </Grommet>
  ))
