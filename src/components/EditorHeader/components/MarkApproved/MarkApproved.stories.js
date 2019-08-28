import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import MarkApproved from './MarkApprovedContainer'
import { mergedTheme } from '../../../../theme'

storiesOf('MarkApproved', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <MarkApproved />
    </Grommet>
  ))
