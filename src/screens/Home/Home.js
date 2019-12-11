import React from 'react'
import {
  Anchor,
  Box,
  Grid,
  Image,
  Text,
} from 'grommet'
import styled from 'styled-components'
import Zooniverse from '../../images/zooniverse.png'
import InfoText from './components/InfoText'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'

const StyledHeader = styled(Heading)`
  font-size: 6em;
  font-weight: 300;
  letter-spacing: -6.16px;
  line-height: 0.9em;

  @media (max-width: 1060px) {
    font-size: 4em;
  }

  @media (max-width: 725px) {
    font-size: 2em;
  }
`

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
        <Footer />
      </Box>
      <Box gridArea='login'>
        <LoginForm />
      </Box>
    </Grid>
  )
}
