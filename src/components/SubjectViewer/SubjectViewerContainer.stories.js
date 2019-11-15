import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import SubjectViewerContainer from './SubjectViewerContainer'
import zooTheme from '@zooniverse/grommet-theme'

storiesOf('SubjectViewer', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='large'>
        <SubjectViewerContainer />
      </Box>
    </Grommet>
  ))
