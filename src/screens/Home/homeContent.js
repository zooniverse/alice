import { Anchor, Box, Text } from 'grommet'
import { Link } from 'react-router-dom'

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
        Anyone with an ALICE-compatible Zooniverse text transcription project
        can use this tool. Some setup required before transcriptions are collected.
        See the
        <Text margin={{ horizontal: '0.2em' }}>
          <Link to='/about'>Getting Started with ALICE</Link>
        </Text>
        docs for further instructions.
      </Text>
  }, {
    header: 'HOW TO USE IT',
    content:
      <Box>
        <Text>
          Documentation has been created to help research teams set up
          and optimally use this tool at alice.zooniverse.org/about. Code is
          available via the
          <Anchor
            href='https://github.com/zooniverse/text-editor'
            label='git repository'
            margin={{ horizontal: '0.2em' }}
          />.
        </Text>
      </Box>
  }
]

export default content;
