import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { mergedTheme } from '../../../../theme'
import UndoButtonContainer from './UndoButtonContainer'
import SaveButtonContainer from './SaveButtonContainer'
import MoreButtonContainer from './MoreButtonContainer'

storiesOf('HeaderButtons', module)
  .add('UndoButton', () => (
    <Grommet theme={mergedTheme}>
      <UndoButtonContainer />
    </Grommet>
  ))
  .add('SaveButton', () => (
    <Grommet theme={mergedTheme}>
      <SaveButtonContainer />
    </Grommet>
  ))
  .add('MoreButton', () => (
    <Grommet theme={mergedTheme}>
      <MoreButtonContainer />
    </Grommet>
  ))
