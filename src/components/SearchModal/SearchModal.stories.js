import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import SearchModalContainer from './SearchModalContainer'
import { mergedTheme } from '../../theme'

storiesOf('SearchModalContainer', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <Box width='25em'>
          <SearchModalContainer />
        </Box>
      </Box>
    </Grommet>
  ))
