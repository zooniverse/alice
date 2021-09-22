import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import DownloadDataModal from './DownloadDataModal'
import zooTheme from '@zooniverse/grommet-theme'

storiesOf('DownloadDataModal', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <DownloadDataModal />
      </Box>
    </Grommet>
  ))
