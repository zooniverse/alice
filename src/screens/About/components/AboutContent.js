import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import { arrayOf, func, number, string } from 'prop-types'
import { Markdown } from 'markdownz'
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
      {props.content.map((item, i) => {
        return (
          <Box direction='row' gap='medium' key={`subcontext_${props.index}_${i}`}>
            <Box basis='2/3' gap='small'>
              <BodyText color='black'>
                <Markdown>{item.text}</Markdown>
              </BodyText>
            </Box>
            <Box basis='1/3'>
              <Button onClick={() => props.setModal(item)} plain>
                <ResponsiveImage alignSelf='start' fit='contain' src={item.image} />
              </Button>
              <CapitalText>
                <Markdown>{item.caption}</Markdown>
              </CapitalText>
            </Box>
        </Box>
      )})}
    </Box>
  )
}

AboutContent.propTypes = {
  caption: string,
  index: number,
  image: string,
  setModal: func,
  text: arrayOf(string),
  title: string
}

AboutContent.defaultProps = {
  caption: '',
  index: 0,
  image: '',
  setModal: () => {},
  text: [],
  title: ''
}
