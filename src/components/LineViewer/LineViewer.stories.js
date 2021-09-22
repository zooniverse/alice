import React from 'react';
import { Box, Grommet } from 'grommet';
import LineViewerContainer from './LineViewerContainer';
import zooTheme from '@zooniverse/grommet-theme';

export default {
  title: 'LineViewer',
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <LineViewerContainer />
    </Box>
  </Grommet>
);
