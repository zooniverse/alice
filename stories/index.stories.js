import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import FilmstripViewer from '../src/components/FilmstripViewer'

storiesOf('ZooFooter', module)
  .add('Default', () => (
    <FilmstripViewer />
  ))
