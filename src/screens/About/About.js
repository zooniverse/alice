import React from 'react'
import { Box, Image, Text } from 'grommet'
import Zooniverse from 'images/zooniverse.png'
import styled from 'styled-components'
import ContentsTable from './components/ContentsTable'
import GettingStarted from './GettingStarted'
import DBScan from './DBScan'
import Optics from './Optics'
import Setup from './Setup'
import UsingAlice from './UsingAlice'
import Acknowledgements from './Acknowledgements'
import DataExports from './DataExports'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ResponsiveText = styled(Text)`
  @media (max-width: 800px) {
    font-size: 0.75em;
  }
`

const StickyBox = styled(Box)`
  height: 100%;
  overflow-y: auto;
  position: -webkit-sticky;
  position: sticky;
  top: 12px;
`

export default function About () {
  const contentContainerRef = React.useRef()

  return (
    <Box align='start' gap='xsmall' margin='medium' direction='row'>
      <StickyBox basis='20%'>
        <Box gap='xsmall' ref={contentContainerRef}>
          <Box height='1em' width='6em'>
            <Image alt='Zooniverse Logo' fit='contain' src={Zooniverse}/>
          </Box>
          <ResponsiveText size='xlarge'>Transcription viewer/editor help</ResponsiveText>
          <CapitalText margin={{ top: 'large', bottom: 'xsmall' }} weight='bold'>Contents</CapitalText>
        </Box>
        <ContentsTable ref={contentContainerRef}/>
      </StickyBox>
      <Box background='white' basis='80%' gap='medium' pad='large' round='xsmall'>
        <GettingStarted />
        <Setup />
        <UsingAlice />
        <Optics />
        <DBScan />
        <DataExports />
        <Acknowledgements />
      </Box>
    </Box>
  )
}
