import React from 'react'
import { Box, Image, Text } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function PhotoBlock({ caption, photos }) {
  return (
    <Box gap='xsmall' margin={{ vertical: 'small' }}>
      {photos.map(item => <Image fit='contain' src={item.photo} width='100%' />)}
      {caption && <CapitalText>{caption}</CapitalText>}
    </Box>
  )
}

PhotoBlock.propTypes = {
  caption: string,
  photos: arrayOf(shape({
    alt: string,
    src: string,
  })).isRequired
}

PhotoBlock.defaultProps = {
  caption: ''
}
