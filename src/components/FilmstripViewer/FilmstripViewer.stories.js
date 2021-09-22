import React from 'react';
import { Box, Grommet } from 'grommet';
import FilmstripViewerContainer from './FilmstripViewerContainer';
import { mergedTheme } from '../../theme';

export default {
  title: 'FilmstripViewer',
};

export const Default = () => (
  <Grommet theme={mergedTheme}>
    <Box background="#D8D8D8" height="xlarge">
      <FilmstripViewerContainer />
    </Box>
  </Grommet>
);
