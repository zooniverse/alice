import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import SubjectViewer from './SubjectViewer'
import SubjectViewerHeader from './components/SubjectViewerHeader'
import ImageTools from './components/ImageTools'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
`

export default function SubjectViewerContainer() {
  const [showTools, setTools] = React.useState(false)
  const onMouseOver = e => setTools(true)
  const onMouseLeave = e => setTools(false)

  return (
    <Box onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} background={{ color: '#858585' }} height='large' width='large' round='xsmall'>
      <SubjectViewerHeader />
      <RelativeBox fill>
        <AbsoluteBox margin='small'>
          {showTools && (<ImageTools />)}
        </AbsoluteBox>
        <SubjectViewer />
      </RelativeBox>
    </Box>
  )
}
