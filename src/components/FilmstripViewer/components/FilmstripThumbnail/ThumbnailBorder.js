import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { number } from 'prop-types'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

export default function ThumbnailBorder({ rotationDegrees }) {
  return (
    <StyledBox
      align='center'
      border={{ color: 'brand', size: 'large' }}
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
  rotationDegrees: 0
}
