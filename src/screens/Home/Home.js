import React from 'react'
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Image,
  Text,
  TextInput
} from 'grommet'
import { FormNextLink } from 'grommet-icons'
import styled from 'styled-components'
import Adler from '../../images/adler.png'
import NEH from '../../images/neh.png'
import Oxford from '../../images/oxford.png'
import Zooniverse from '../../images/zooniverse.png'
import InfoText from './components/InfoText'

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

const SmallHeader = styled(Heading)`
  font-weight: 300;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const images = [ NEH, Zooniverse, Adler, Oxford ];
const content = [
  {
    header: 'WHAT IS THIS',
    text:
      <Text>
        The Zooniverse team have created this app to view and edit
        the results of transcription projects hosted on Zooniverse.
      </Text>
  },{
    header: 'WHO CAN USE IT',
    text:
      <Text>
        Anyone with a text transcription project can use this tool.
      <Anchor color='link' margin={{ left: '0.2em' }} size='xsmall'>Contact</Anchor> the Zooniverse team to set up your transcription project.</Text>
  }, {
    header: 'HOW TO USE IT',
    text:
      <Box>
        <Text>
          Documentation has been created to help research teams set up
          and optimally use this tool.
        </Text>
        <Anchor color='link' href='#' margin={{ vertical: 'xsmall' }} size='xsmall'>Link to Documentation</Anchor>
      </Box>
  }
]

export default function Home () {
  return (
    <Box direction='row' fill>
      <Box alignSelf='start' margin={{ horizontal: 'medium' }}>
        <Box margin={{ vertical: 'large' }}>
          <Box height='2em' width='12em'>
            <Image fit='contain' src={Zooniverse} />
          </Box>
          <StyledHeader >
            Transcription viewer/editor
          </StyledHeader>
        </Box>
        <Box
          border={{ color: 'black', side: 'bottom' }}
          direction='row'
          gap='medium'
          pad={{ bottom: 'xlarge' }}>
          {content.map((item, i) => <InfoText index={i} item={item}/> )}
        </Box>
        <Box direction='row' pad={{ vertical: 'small' }} align='center' wrap gap='medium'>
          {images.map((image, i) =>
            <Box height='3em' width='xsmall'>
              <Image key={`LOGO_${i}`} fit='contain' src={image}/>
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
        <Anchor color='link' href="https://www.zooniverse.org" margin={{ vertical: 'small' }} target="_blank" rel="noopener noreferrer">
          <CapitalText>zooniverse.org</CapitalText>
        </Anchor>
      </Box>
      <Box
        background='white'
        margin={{"right": "2em"}}
        width='large'
        pad='medium'>
        <SmallHeader level="3" margin={{ top: 'large' }}>
          Log in with your Zooniverse username to get started
        </SmallHeader>
        <Form>
          <FormField
            name="email"
            required
          >
            <TextInput placeholder="e.g. zoofan1@nasa.gov" size='small'/>
          </FormField>
          <Box direction='row' justify='between' wrap>
            <Text size='small'>Email Address</Text>
          </Box>
          <FormField
            name="password"
            type="password"
            required/>
          <Box direction='row' justify='between' wrap>
            <Text size='small'>Password</Text>
          </Box>
          <Button
            gap='xxsmall'
            icon={<FormNextLink size='small'/>}
            label={<CapitalText size='small'>Sign In</CapitalText>}
            plain
            reverse
            type="submit"
          />
        </Form>
      </Box>
    </Box>
  )
}
