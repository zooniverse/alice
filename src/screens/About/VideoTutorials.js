import React from 'react'
import { Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import VimeoEmbed from './components/VimeoEmbed'
import { BodyText } from './components/Styled'

export default function DataExports() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Video tutorials' />
      <BodyText>
        The video tutorials below offer detailed guidance around using specific ALICE features. The tutorials feature audio narration as well as captions, which you can turn on by clicking the "CC" button next to the volume control in the video menu.
      </BodyText>
      <AboutTitle level={6} title='ALICE: Logging in & navigation' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454881167?h=d531a65574&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Logging in &amp;amp; navigation'
      />
      <AboutTitle level={6} title='ALICE: Projects, workflows, & groups' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454881239?h=a64d63f978&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          title='ALICE: Projects, workflows, &amp;amp; groups'
      />
      <AboutTitle level={6} title='ALICE: Sorting & searching' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454881407?h=26bbc20c07&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Sorting &amp;amp; searching'
      />
      <AboutTitle level={6} title='ALICE: Viewing subjects' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454861272?h=8634fa79f8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Viewing subjects'
      />
      <AboutTitle level={6} title='ALICE: Editing & deleting transcriptions' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454881046?h=d37680e4bc&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Editing &amp;amp; deleting transcriptions'
      />
      <AboutTitle level={6} title='ALICE: Reordering transcription lines' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454881361?h=4c0fdbad64&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Reordering transcription lines'
      />
      <AboutTitle level={6} title='ALICE: Approving subjects' />
      <VimeoEmbed
        src='https://player.vimeo.com/video/454880924?h=16f5d51437&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        title='ALICE: Approving subjects'
      />
    </Box>
  )
}
