import { storiesOf } from '@storybook/react'
import { Box, Grommet } from 'grommet'
import FilmstripViewerContainer from './FilmstripViewerContainer'
import { mergedTheme } from '../../theme'

storiesOf('FilmstripViewer', module)
  .add('Default', () => (
    <Grommet theme={mergedTheme}>
      <Box background='#D8D8D8' height='xlarge'>
        <FilmstripViewerContainer />
      </Box>
    </Grommet>
  ))
