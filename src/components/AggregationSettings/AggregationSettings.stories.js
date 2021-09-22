import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import { AggregationSettingsContainer } from './AggregationSettingsContainer'
import { mergedTheme } from '../../theme'

storiesOf('AggregationSettings', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <AggregationSettingsContainer />
      </Box>
    </Grommet>
  ))
