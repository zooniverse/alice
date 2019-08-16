import React from 'react'
import { Box, Button, Form, FormField, Image, Heading, Text } from 'grommet'
import { FormNextLink } from 'grommet-icons'
import styled from 'styled-components'
import Adler from './images/adler.png'
import NEH from './images/neh.png'
import Oxford from './images/oxford.png'
import Zooniverse from './images/zooniverse.png'

const StyledHeader = styled(Heading)`
  font-weight: 300;
  line-height: 0.9em;
  font-size: 6em;

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
    text: `
      The Zooniverse team have craeted a tool to view and edit
      the results of transcription projects hosted on Zooniverse,
    `,
    link: '',
  },{
    header: 'WHO CAN USE IT',
    text: 'Anyone with a text transcription can use this tool.',
    link: '',
  }, {
    header: 'HOW TO USE IT',
    text: `
      Documentation has been created to help use this tool but
      honestly it's so well designed you won't need it.
    `,
    link: 'Link to documentation',
  }
]

export default function Home () {
  return (
    <Box direction='row' fill>
      <Box alignSelf='start' margin={{ horizontal: 'medium' }}>
        <StyledHeader>
          Zooniverse transcription viewer/editor
        </StyledHeader>
        <Box
          direction='row'
          border='bottom'
          gap='medium'>
          {content.map((item, i) =>
            <Box key={`INFO_${i}`} width='20vw' margin={{ bottom: 'xlarge' }}>
              <Text size='small' weight='bold'>{item.header}</Text>
              <Text size='small' margin={{ vertical: 'small' }}>{item.text}</Text>
              <Text size='small'>{item.link}</Text>
            </Box>)}
        </Box>
        <Box direction='row' pad={{ vertical: 'small' }} align='center' wrap gap='large'>
          {images.map((image, i) => <Image key={`LOGO_${i}`} src={image}/>)}
        </Box>
        <Box>
          <CapitalText size='xsmall'>
            This material is based upon work supported by the national endowment
            for the humanities under award HAA-263825-19. The Zooniverse is a
            collaboration between the Adler Planetarium, the University of Oxford,
            the University of Minnesota, and the broader Citizen Science Alliance.
          </CapitalText>
        </Box>
        <Text margin={{ vertical: 'small' }} size='small'>
          <a href="https://www.zooniverse.org" target="_blank" rel="noopener noreferrer">
            www.zooniverse.org
          </a>
        </Text>
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
            name="username"
            required/>
          <Box direction='row' justify='between' wrap>
            <Text size='small'>Username</Text>
            <CapitalText size='small'>Forgot Username?</CapitalText>
          </Box>
          <FormField
            name="password"
            type="password"
            required/>
            <Box direction='row' justify='between' wrap>
              <Text size='small'>Password</Text>
              <CapitalText size='small'>Forgot Password?</CapitalText>
            </Box>
            <Button type="submit">
              <Box pad={{ vertical: 'small' }} direction='row' align='center' gap='xsmall'>
                <CapitalText size='small'>Sign In</CapitalText>
                <FormNextLink size='small'/>
              </Box>
            </Button>
        </Form>
      </Box>
    </Box>
  )
}
