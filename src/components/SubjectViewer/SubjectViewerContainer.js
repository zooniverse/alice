import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import SubjectViewerHeader from './components/SubjectViewerHeader'
import ImageTools from './components/ImageTools'
import SVGImage from './components/SVGImage'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
`

function SubjectViewerContainer() {
  const [showTools, setTools] = React.useState(false)
  const onMouseOver = e => {
    if (store.aggregations.showModal) return null;
    setTools(true)
  }
  const onMouseLeave = e => setTools(false)

  return (
    <Box
      background={{ color: '#858585' }}
      height='large'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      round='xsmall'
    >
      <SubjectViewerHeader />
      <RelativeBox fill>
        <AbsoluteBox margin='small'>
          {showTools && <ImageTools />}
        </AbsoluteBox>
        <SVGImage />
      </RelativeBox>
    </Box>
  )
}

export default SubjectViewerContainer
