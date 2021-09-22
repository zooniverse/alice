import React from 'react';
import { Grommet } from 'grommet';
import MarkApproved from './MarkApprovedContainer';
import { mergedTheme } from '../../../../theme';

export default {
  title: 'MarkApproved',
};

export const Default = () => (
  <Grommet theme={mergedTheme}>
    <MarkApproved />
  </Grommet>
);
