import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import MetadataButtonContainer from './MetadataButtonContainer'
import { mergedTheme } from '../../../../theme'

storiesOf('MetadataButton', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <MetadataButtonContainer />
      </Box>
    </Grommet>
  ))
