import React from 'react'
import { Anchor, Box, Text } from 'grommet'
import AboutTitle from './components/AboutTitle'
import PhotoBlock from './components/PhotoBlock'
import styled from 'styled-components'
import Create from 'images/about/create.png'
import Register from 'images/about/register.png'

const BodyText = styled(Text)`
  line-height: 1.75em;
`

const REGISTER = 'The registration button, shown here in red'

const photos = [
  { alt: REGISTER, photo: Register }
]

export default function GettingStarted() {
  return (
    <Box>
      <AboutTitle title='Getting Started' />
      <BodyText>
        Welcome to <b>ALICE</b>, the <b>A</b>ggregate <b>L</b>ine <b>I</b>nspector
        and <b>C</b>ollaborative <b>E</b>ditor. ALICE is a tool for working
        collaboratively to view and edit the output of text transcription projects
        on Zooniverse.org. To use this tool, you will need to have an ALICE-compatible
        transcription project set up in the
        <Anchor
          href='https://www.zooniverse.org/lab'
          label='Zooniverse Project Builder'
          margin={{ left: '0.2em' }}
        />
        . For
        instructions on how to make your project ALICE-compatible, read on.
      </BodyText>
      <BodyText>
        To build your transcription project, you will need a Zooniverse account.
        Create your account by visiting
        <Anchor
          href='https://www.zooniverse.org'
          label='https://www.zooniverse.org'
          margin={{ horizontal: '0.2em' }}
        />
        and clicking <b>REGISTER</b>. You only need a name and email address to
        create an account.
      </BodyText>
      <PhotoBlock caption={REGISTER} photos={photos} />
      <BodyText>
        Once you’ve created your account, read through the Zooniverse documentation
        and policies at
        <Anchor
          href='https://www.help.zooniverse.org'
          label='help.zooniverse.org.'
          margin={{ left: '0.2em' }}
        />
      </BodyText>
      <BodyText>
        To create a project, visit
        <Anchor
          href='https://www.zooniverse.org/lab'
          label='https://www.zooniverse.org/lab'
          margin={{ left: '0.2em' }}
        />
        , sign into your account, and click <b>Create a new project.</b>
      </BodyText>
      <PhotoBlock photos={[{ alt: 'Create a new project button from the project lab.', photo: Create }]} />
    </Box>
  )
}
