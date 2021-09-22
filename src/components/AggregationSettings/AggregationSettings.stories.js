import React from 'react';
import { Box, Grommet } from 'grommet';
import { AggregationSettingsContainer } from './AggregationSettingsContainer';
import { mergedTheme } from '../../theme';

export default {
  title: 'AggregationSettings',
};

export const Default = () => (
  <Grommet theme={mergedTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <AggregationSettingsContainer />
    </Box>
  </Grommet>
);
