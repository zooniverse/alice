import React from 'react'
import {
  Anchor,
  Box,
  Image,
  Text,
} from 'grommet'
import Alice from '../../images/alice.png'
import { Link } from 'react-router-dom'
import Zooniverse from '../../images/zooniverse.png'
import InfoText from './components/InfoText'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  @media (min-width: 1440px) {
    margin: auto
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
        <Text margin={{ vertical: 'xsmall' }} size='xsmall'>
          <Link to='/about'>Link to Documentation</Link>
        </Text>
      </Box>
  }
]

export default function Home () {
  return (
    <Box direction='row' fill>
      <StyledBox pad='medium' width='large'>
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
      </StyledBox>
      <Box margin={{ left: 'auto', right: 'small' }} width='medium'>
        <LoginForm />
      </Box>
    </Box>
  )
}
