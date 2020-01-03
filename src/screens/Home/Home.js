import React from 'react'
import {
  Anchor,
  Box,
  Grid,
  Image,
  Text,
} from 'grommet'
import styled from 'styled-components'
import Alice from '../../images/alice.png'
import Adler from '../../images/adler.png'
import NEH from '../../images/neh.png'
import Oxford from '../../images/oxford.png'
import Zooniverse from '../../images/zooniverse.png'
import InfoText from './components/InfoText'
import LoginForm from './components/LoginForm'

const CapitalText = styled(Text)`
  text-transform: uppercase;
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

const content = [
  {
    header: 'WHAT IS THIS',
    content:
      <Text>
        The Zooniverse team have created this app to view and edit
        the results of transcription projects hosted on Zooniverse.
      </Text>
  },{
    header: 'WHO CAN USE IT',
    content:
      <Text>
        Anyone with a text transcription project can use this tool.
      <Anchor margin={{ left: '0.2em' }} size='xsmall'>Contact</Anchor> the Zooniverse team to set up your transcription project.</Text>
  }, {
    header: 'HOW TO USE IT',
    content:
      <Box>
        <Text>
          Documentation has been created to help research teams set up
          and optimally use this tool.
        </Text>
        <Anchor href='#' margin={{ vertical: 'xsmall' }} size='xsmall'>Link to Documentation</Anchor>
      </Box>
  }
]

export default function Home () {
  return (
    <Grid
      areas={[{ name: 'content', start: [0, 0], end: [0, 0] }, { name: 'login', start: [1, 0], end: [1, 0] }]}
      columns={['2/3', '1/3']}
      rows={['full']}
      fill>
      <Box gridArea='content' pad='medium'>
        <Box margin={{ vertical: 'large' }}>
          <Box height='2em' width='12em'>
            <Image alt="Powered by Zooniverse" fit='contain' src={Zooniverse} />
          </Box>
          <Box width='50%'>
            <Image alt='ALICE Logo' fit='contain' src={Alice} />
          </Box>
          <Text color="#5C5C5C" size='large'>Aggregate Line Inspector / Collaborative Editor</Text>
        </Box>
        <Box
          border='bottom'
          direction='row'
          gap='medium'
          pad={{ bottom: 'xlarge' }}>
          {content.map((item, i) => <InfoText key={`INFO_${i}`} index={i} item={item}/> )}
        </Box>
        <Box direction='row' pad={{ vertical: 'small' }} align='center' wrap gap='medium'>
          {images.map((image) =>
            <Box key={image.title} height='3em' width='xsmall'>
              <Image alt={`${image.title} Logo`} fit='contain' src={image.logo}/>
            </Box>
          )}
        </Box>
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
      <Box gridArea='login'>
        <LoginForm />
      </Box>
    </Grid>
  )
}
