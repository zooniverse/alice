import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import { func, string } from 'prop-types'
import styled from 'styled-components'

const BodyText = styled(Text)`
  line-height: 1.75em;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ResponsiveImage = styled(Image)`
  max-width: 100%;
`

export default function AboutContent(props) {
  return (
    <Box gap='small'>
      {props.title.length > 0 && <Text id={props.title} size='large'>{props.title}</Text>}
      <Box direction='row' gap='medium'>
        <Box basis='2/3'>
          <BodyText color='black'>
            {props.text}
          </BodyText>
        </Box>
        <Box basis='1/3'>
          <Box>
            <Button onClick={() => props.setModal(props)} plain>
              <ResponsiveImage alignSelf='start' fit='contain' src={props.image} />
            </Button>
            <CapitalText>{props.caption}</CapitalText>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

AboutContent.propTypes = {
  caption: string,
  image: string,
  setModal: func,
  text: string,
  title: string
}

AboutContent.defaultProps = {
  caption: '',
  image: '',
  setModal: () => {},
  text: '',
  title: ''
}
