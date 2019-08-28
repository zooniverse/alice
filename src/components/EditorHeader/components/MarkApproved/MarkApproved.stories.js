import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import zooTheme from '@zooniverse/grommet-theme'
import MarkApproved from './MarkApproved'

storiesOf('MarkApproved', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <MarkApproved />
    </Grommet>
  ))
