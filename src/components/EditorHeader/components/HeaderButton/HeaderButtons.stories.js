import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { mergedTheme } from '../../../../theme'
import UndoButtonContainer from './UndoButtonContainer'
import MoreButtonContainer from '../MoreButton'
import LayoutButtonContainer from './LayoutButtonContainer'

storiesOf('HeaderButtons', module)
  .add('UndoButton', () => (
    <Grommet theme={mergedTheme}>
      <UndoButtonContainer />
    </Grommet>
  ))
  .add('MoreButton', () => (
    <Grommet theme={mergedTheme}>
      <MoreButtonContainer />
    </Grommet>
  ))
  .add('LayoutButton', () => (
    <Grommet theme={mergedTheme}>
      <LayoutButtonContainer />
    </Grommet>
  ))
