import React from 'react';

import { storiesOf } from '@storybook/react';
import { Box } from 'grommet';
import FilmstripViewer from '../src/components/FilmstripViewer'

storiesOf('FilmstripViewer', module)
  .add('Default', () => (
    <Box background='#888888' height='xlarge'>
      <FilmstripViewer />
    </Box>
  ))
