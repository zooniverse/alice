import React from 'react'
import { Box, Image, Text } from 'grommet'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

function FilmstripThumbnail ({ rotationDegrees, src }) {
  return (
    <Box height='xsmall' margin='xsmall' width='xsmall'>
      {rotationDegrees && (
        <StyledBox
          align='center'
          border={{ color: 'blue', size: 'large' }}
          height='xsmall'
          justify='center'
          width='xsmall'>
          <Text color='white' size='xlarge'>{rotationDegrees}&deg;</Text>
        </StyledBox>
      )}
      <Image fit='cover' src={src} />
    </Box>
  )
}

export default FilmstripThumbnail
