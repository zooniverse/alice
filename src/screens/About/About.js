import React from 'react'
import { Box, Image, Text } from 'grommet'
import Zooniverse from 'images/zooniverse.png'
import styled from 'styled-components'

const BodyText = styled(Text)`
  line-height: 1.75em;
`

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
        <Box direction='row' gap='medium'>
          <Box basis='2/3'>
            <BodyText color='black'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor
            </BodyText>
          </Box>
          <Box basis='1/3'>
            <Box background='yellow' height='small' width='medium'>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
