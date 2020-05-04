import React from 'react'
import { Anchor, Box, Image, Text } from 'grommet'
import Zooniverse from 'images/zooniverse.png'
import styled from 'styled-components'
import content from './content'
import GettingStarted from './GettingStarted'
import Optics from './Optics'
import Setup from './Setup'
import UsingAlice from './UsingAlice'

const PlainAnchor = styled(Anchor)`
  text-decoration: none;
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
          {content.map((item, i) => {
            return (
              <PlainAnchor key={`ABOUT_NAV_${i}`} href={`#${item.title}`}>
                <CapitalText color='#005D69' weight={300}>{item.title}</CapitalText>
              </PlainAnchor>
            )
          })}
        </Box>
      </StickyBox>
      <Box background='white' basis='80%' gap='small' pad='large' round='xsmall'>
        <GettingStarted />
        <Setup />
        <UsingAlice />
        <Optics />
      </Box>
    </Box>
  )
}
