import { Box, Heading, Image } from 'grommet'
import Alice from '../../images/alice.png'
import Zooniverse from '../../images/zooniverse.png'
import InfoText from './components/InfoText'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import content from './homeContent'
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

const LiteHeading = styled(Heading)`
  font-weight: 300;
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

export default function Home () {
  return (
    <RelativeBox fill>
      <CenterBox>
        <ContentBox gap='large'>
          <Box margin={{ top: 'large' }} pad='small'>
            <Box height='2em' width='12em'>
              <Image alt="Powered by Zooniverse" fit='contain' src={Zooniverse} />
            </Box>
            <AliceBox>
              <Image alt='ALICE Logo' fit='contain' src={Alice} />
            </AliceBox>
            <LiteHeading color="#5C5C5C" level='2'>Aggregate Line Inspector / Collaborative Editor</LiteHeading>
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
          <Box border='top' margin='small'>
            <Footer />
          </Box>
        </ContentBox>
      </CenterBox>
    </RelativeBox>
  )
}
