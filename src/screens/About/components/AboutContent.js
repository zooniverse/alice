import React from 'react'
import { Box, Image, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const BodyText = styled(Text)`
  line-height: 1.75em;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function AboutContent({ caption, image, text, title }) {
  return (
    <Box gap='small'>
      {title.length > 0 && <Text size='large'>{title}</Text>}
      <Box direction='row' gap='medium'>
        <Box basis='2/3'>
          <BodyText color='black'>
            {text}
          </BodyText>
        </Box>
        <Box basis='1/3'>
          <Box>
            <Image alignSelf='start' fit='contain' src={image} />
            <CapitalText>{caption}</CapitalText>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

AboutContent.propTypes = {
  caption: string,
  image: string,
  text: string,
  title: string
}

AboutContent.defaultProps = {
  caption: '',
  image: '',
  text: '',
  title: ''
}
