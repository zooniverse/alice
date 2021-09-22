import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import LineViewerContainer from './LineViewerContainer'
import zooTheme from '@zooniverse/grommet-theme'

storiesOf('LineViewer', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <LineViewerContainer />
      </Box>
    </Grommet>
  ))
