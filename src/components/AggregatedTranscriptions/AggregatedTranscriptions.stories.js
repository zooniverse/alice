import React from 'react';
import { Box, Grommet } from 'grommet';
import AggregatedTranscriptionsContainer from './AggregatedTranscriptionsContainer';
import { mergedTheme } from '../../theme';

export default {
  title: 'AggregatedTranscriptions',
};

export const Default = () => (
  <Grommet theme={mergedTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <Box width="large">
        <AggregatedTranscriptionsContainer />
      </Box>
    </Box>
  </Grommet>
);
