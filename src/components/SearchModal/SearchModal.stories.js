import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import SearchModal from './SearchModal'
import { mergedTheme } from '../../theme'

storiesOf('SearchModal', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <SearchModal />
      </Box>
    </Grommet>
  ))
