import React from 'react';
import { Box, Grommet } from 'grommet';
import SubjectViewerContainer from './SubjectViewerContainer';
import zooTheme from '@zooniverse/grommet-theme';

export default {
  title: 'SubjectViewer',
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <Box background="#D8D8D8" height="large">
      <SubjectViewerContainer />
    </Box>
  </Grommet>
);
