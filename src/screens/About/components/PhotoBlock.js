import React from 'react'
import { Box, Image, Text } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { Markdown } from 'markdownz'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledBox = styled(Box)`
  display: inline-block;
`

const StyledImage = styled(Image)`
  max-height: 20em;
`

export default function PhotoBlock({ caption, description, photos }) {
  const width = photos.length > 1 ? '50%' : '100%';
  return (
    <StyledBox margin={{ vertical: 'small' }}>
      {photos.map((item, i) => (
        <StyledImage
          key={`${description}_${i}`}
          fit='contain'
          width={width}
          src={item.photo}
        />
      ))}
      {caption && (
        <CapitalText>
          <Markdown>{caption}</Markdown>
        </CapitalText>
      )}
    </StyledBox>
  )
}

PhotoBlock.propTypes = {
  caption: string,
  description: string.isRequired,
  photos: arrayOf(shape({
    alt: string,
    src: string,
  })).isRequired
}

PhotoBlock.defaultProps = {
  caption: ''
}
