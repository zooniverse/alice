import React from 'react';
import { Box, Grommet } from 'grommet';
import MetadataButtonContainer from './MetadataButtonContainer';
import { mergedTheme } from '../../../../theme';

export default {
  title: 'MetadataButton',
};

export const Default = () => (
  <Grommet theme={mergedTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <MetadataButtonContainer />
    </Box>
  </Grommet>
);
