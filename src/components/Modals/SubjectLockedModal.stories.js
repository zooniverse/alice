import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import SubjectLockedModal from './SubjectLockedModal'
import zooTheme from '@zooniverse/grommet-theme'

storiesOf('SubjectLockedModal', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <SubjectLockedModal />
      </Box>
    </Grommet>
  ))
