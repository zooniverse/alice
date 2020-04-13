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

export default function PhotoBlock({ caption, photos }) {
  const width = photos.length > 1 ? '50%' : '100%';
  return (
    <StyledBox margin={{ vertical: 'small' }}>
      {photos.map(item => (
        <Image fit='contain' src={item.photo} width={width} />
      ))}
      {caption && (
        <CapitalText>
          <Markdown>
              {caption}
          </Markdown>
        </CapitalText>
      )}
    </StyledBox>
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
