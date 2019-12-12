import React from 'react'
import { Anchor, Box, Image, Layer, Text } from 'grommet'
import Zooniverse from 'images/zooniverse.png'
import styled from 'styled-components'
import content from './content'
import AboutContent from './components/AboutContent'
import AboutModal from './components/AboutModal'

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
  const [currentModal, setModal] = React.useState(null)

  return (
    <Box align='start' gap='xsmall' margin='medium' direction='row'>
      {currentModal && (
        <Layer>
          <AboutModal caption={currentModal.caption} image={currentModal.image} setModal={setModal} />
        </Layer>
      )}
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
        <Text color='black' size='xlarge'>How to Use this Tool</Text>
        {content.map((item, i) => {
          return (
            <AboutContent
              key={`CONTENT_${i}`}
              caption={item.caption}
              image={item.image}
              setModal={setModal}
              text={item.text}
              title={item.title}
            />
          )
        })}
      </Box>
    </Box>
  )
}
