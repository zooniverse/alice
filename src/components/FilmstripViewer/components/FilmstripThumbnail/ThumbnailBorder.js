import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { bool, number } from 'prop-types'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

export default function ThumbnailBorder({ isActive, isHover, rotationDegrees }) {
  let border = {}
  if (isHover) {
    border = { color: 'brand', size: 'medium' }
  }
  if (isActive) {
    border = { color: 'brand', size: 'large' }
  }

  return (
    <StyledBox
      align='center'
      border={border}
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
  isActive: bool,
  isHover: bool,
  rotationDegrees: number
}

ThumbnailBorder.defaultProps = {
  isActive: false,
  isHover: false,
  rotationDegrees: 0
}
