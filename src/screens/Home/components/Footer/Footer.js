import React from 'react'
import {
  Anchor,
  Box,
  Image,
  Text,
} from 'grommet'
import styled from 'styled-components'
import Adler from 'images/adler.png'
import NEH from 'images/neh.png'
import Oxford from 'images/oxford.png'
import Zooniverse from 'images/zooniverse.png'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StackBox = styled(Box)`
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const images = [{
    logo: NEH, title: 'National Endowment for the Humanities'
  }, {
    logo: Zooniverse, title: 'Zooniverse'
  }, {
    logo: Adler, title: 'Adler Planetarium'
  }, {
    logo: Oxford, title: 'Oxford University'
}];

export default function Footer () {
  return (
    <Box>
      <StackBox align='center' gap='medium' pad={{ vertical: 'small' }} wrap>
        {images.map((image) =>
          <Box key={image.title} height='2.8em' margin={{ right: 'xsmall' }} width='xsmall'>
            <Image alt={`${image.title} Logo`} fit='contain' src={image.logo}/>
          </Box>
        )}
      </StackBox>
      <Box>
        <CapitalText size='xsmall'>
          This material is based upon work supported by the national endowment
          for the humanities under award HAA-263825-19. The Zooniverse is a
          collaboration between the Adler Planetarium, the University of Oxford,
          the University of Minnesota, and the broader Citizen Science Alliance.
        </CapitalText>
      </Box>
      <Anchor href="https://www.zooniverse.org" margin={{ vertical: 'small' }} target="_blank" rel="noopener noreferrer">
        <CapitalText>zooniverse.org</CapitalText>
      </Anchor>
    </Box>
  )
}
