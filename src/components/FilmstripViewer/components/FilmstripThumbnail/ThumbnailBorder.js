import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { number } from 'prop-types'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

export default function ThumbnailBorder({ isActive, rotationDegrees }) {
  const color = isActive ? 'blue' : 'transparent'
  return (
    <StyledBox
      align='center'
      border={{ color, size: 'large' }}
      height='xsmall'
      justify='center'
      width='xsmall'>
      {rotationDegrees && (
        <Text
          color='white'
          size='xlarge'
        >
          {rotationDegrees}&deg;
        </Text>
      )}
    </StyledBox>
  )
}

ThumbnailBorder.propTypes = {
  rotationDegrees: number
}

ThumbnailBorder.defaultProps = {
  rotationDegrees: null
}
