import React from 'react';
import { Grommet } from 'grommet';
import { mergedTheme } from '../../../../theme';
import UndoButtonContainer from './UndoButtonContainer';
import MoreButtonContainer from '../MoreButton';
import LayoutButtonContainer from './LayoutButtonContainer';

export default {
  title: 'HeaderButtons',
};

export const UndoButton = () => (
  <Grommet theme={mergedTheme}>
    <UndoButtonContainer />
  </Grommet>
);

UndoButton.story = {
  name: 'UndoButton',
};

export const MoreButton = () => (
  <Grommet theme={mergedTheme}>
    <MoreButtonContainer />
  </Grommet>
);

MoreButton.story = {
  name: 'MoreButton',
};

export const LayoutButton = () => (
  <Grommet theme={mergedTheme}>
    <LayoutButtonContainer />
  </Grommet>
);

LayoutButton.story = {
  name: 'LayoutButton',
};
