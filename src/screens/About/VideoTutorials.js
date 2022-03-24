import React from 'react'
import { Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText } from './components/Styled'

export default function DataExports() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Video tutorials' />
      <BodyText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </BodyText>
      <AboutTitle level={6} title='ALICE: Logging in & navigation' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454881167?h=d531a65574&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Logging in &amp;amp; navigation'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Projects, workflows, & groups' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454881239?h=a64d63f978&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Projects, workflows, &amp;amp; groups'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Sorting & searching' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454881407?h=26bbc20c07&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Sorting &amp;amp; searching'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Viewing subjects' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454861272?h=8634fa79f8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Viewing subjects'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Editing & deleting transcriptions' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454881046?h=d37680e4bc&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Editing &amp;amp; deleting transcriptions'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Reordering transcription lines' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454881361?h=4c0fdbad64&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Reordering transcription lines'>
        </iframe>
      </div>
      <AboutTitle level={6} title='ALICE: Approving subjects' />
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src='https://player.vimeo.com/video/454880924?h=16f5d51437&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          title='ALICE: Approving subjects'>
        </iframe>
      </div>
    </Box>
  )
}