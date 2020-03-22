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

const AliceBox = styled(Box)`
  max-width: 550px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const ContentBox = styled(Box)`
  @media (min-width: 768px) {
    margin-right: 375px;
    max-width: 850px;
  }
`

const CenterBox = styled(Box)`
  @media (min-width: 1440px) {
    margin: auto;
  }
`

const RelativeBox = styled(Box)`
  position: relative;
`

const LoginBox = styled(Box)`
  width: 100%;

  @media (min-width: 768px) {
    margin-right: 25px;
    max-width: 40%;
    position: absolute;
    right: 0;
    width: 350px;
  }
`

const StackBox = styled(Box)`
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
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
    <RelativeBox fill>
      <CenterBox>
        <ContentBox>
          <Box pad='small'>
            <Box height='2em' width='12em'>
              <Image alt="Powered by Zooniverse" fit='contain' src={Zooniverse} />
            </Box>
            <AliceBox>
              <Image alt='ALICE Logo' fit='contain' src={Alice} />
            </AliceBox>
            <Text color="#5C5C5C" size='large'>Aggregate Line Inspector / Collaborative Editor</Text>
          </Box>
          <LoginBox fill='vertical'>
            <LoginForm />
          </LoginBox>
          <StackBox gap='small' pad='small'>
            {content.map((item, i) => (
              <InfoText
                key={`INFO_${i}`}
                index={i}
                item={item}/
              >))}
          </StackBox>
          <Box pad='small'>
            <Footer />
          </Box>
        </ContentBox>
      </CenterBox>
    </RelativeBox>
  )
}
