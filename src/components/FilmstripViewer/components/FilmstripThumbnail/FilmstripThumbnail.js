import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import styled from 'styled-components'
import { bool, func, number, string } from 'prop-types'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

export default function FilmstripThumbnail ({ index, isActive, rotationDegrees, selectImage, src }) {
  return (
      <Button margin='xsmall' onClick={() => selectImage(index)}>
        <Box height='xsmall' width='xsmall'>
          {isActive && (
            <StyledBox
              align='center'
              border={{ color: 'blue', size: 'large' }}
              height='xsmall'
              justify='center'
              width='xsmall'>
              {rotationDegrees && <Text color='white' size='xlarge'>{rotationDegrees}&deg;</Text>}
            </StyledBox>
          )}
          <Image fit='cover' src={src} />
        </Box>
      </Button>
  )
}

FilmstripThumbnail.propTypes = {
  index: number,
  isActive: bool,
  rotationDegrees: number,
  selectImage: func,
  src: string
}

FilmstripThumbnail.defaultProps = {
  index: 0,
  isActive: false,
  rotationDegrees: null,
  selectImage: () => {},
  src: ''
}
