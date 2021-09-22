import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import UnapproveModal from './UnapproveModal'
import zooTheme from '@zooniverse/grommet-theme'

storiesOf('UnapproveModal', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <UnapproveModal />
      </Box>
    </Grommet>
  ))
