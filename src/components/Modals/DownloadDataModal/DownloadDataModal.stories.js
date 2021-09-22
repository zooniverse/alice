import React from 'react';
import { Box, Grommet } from 'grommet';
import DownloadDataModal from './DownloadDataModal';
import zooTheme from '@zooniverse/grommet-theme';

export default {
  title: 'DownloadDataModal',
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <DownloadDataModal />
    </Box>
  </Grommet>
);
