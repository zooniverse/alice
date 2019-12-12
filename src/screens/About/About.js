import React from 'react'
import { Box, Image, Text } from 'grommet'
import Zooniverse from 'images/zooniverse.png'
import styled from 'styled-components'
import content from './content'
import AboutContent from './components/AboutContent'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ResponsiveText = styled(Text)`
  @media (max-width: 800px) {
    font-size: 0.75em;
  }
`

const StickyBox = styled(Box)`
  position: -webkit-sticky;
  position: sticky;
  top: 1em;
`

export default function About () {
  return (
    <Box align='start' gap='xsmall' margin='medium' direction='row'>
      <StickyBox basis='20%'>
        <Box gap='xsmall'>
          <Box height='1em' width='6em'>
            <Image alt='Zooniverse Logo' fit='contain' src={Zooniverse}/>
          </Box>
          <ResponsiveText size='xlarge'>Transcription viewer/editor help</ResponsiveText>
        </Box>
        <Box gap='xsmall' margin={{ top: 'large' }}>
          <CapitalText weight='bold'>Contents</CapitalText>
          <CapitalText color='#005D69'>Intro</CapitalText>
          <CapitalText color='#005D69'>Another Topic</CapitalText>
          <CapitalText color='#005D69'>Something Else</CapitalText>
          <CapitalText color='#005D69'>These Are All Links</CapitalText>
          <CapitalText color='#005D69'>So Much Content</CapitalText>
          <CapitalText color='#005D69'>This Should Be Sticky</CapitalText>
          <CapitalText color='#005D69'>Only the White Part Scrolls</CapitalText>
        </Box>
      </StickyBox>
      <Box background='white' basis='80%' gap='small' pad='large' round='xsmall'>
        <Text color='black' size='xlarge'>How to Use this Tool</Text>
        {content.map((item, i) => {
          return (
            <AboutContent
              key={`CONTENT_${i}`}
              caption={item.caption}
              image={item.image}
              text={item.text}
              title={item.title}
            />
          )
        })}
      </Box>
    </Box>
  )
}
