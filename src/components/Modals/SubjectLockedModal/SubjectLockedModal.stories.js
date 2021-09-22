import React from 'react';
import { Box, Grommet } from 'grommet';
import SubjectLockedModal from './SubjectLockedModal';
import zooTheme from '@zooniverse/grommet-theme';

export default {
  title: 'SubjectLockedModal',
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <SubjectLockedModal />
    </Box>
  </Grommet>
);
