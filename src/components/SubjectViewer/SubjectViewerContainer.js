import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import AppContext from 'store'
import { observer } from 'mobx-react'
import SubjectViewer from './SubjectViewer'
import SubjectViewerHeader from './components/SubjectViewerHeader'
import ImageTools from './components/ImageTools'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
`

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  const [showTools, setTools] = React.useState(false)
  const onMouseOver = e => setTools(true)
  const onMouseLeave = e => setTools(false)

  return (
    <Box onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} background={{ color: '#858585' }} height='large' round='xsmall'>
      <SubjectViewerHeader />
      <RelativeBox fill>
        <AbsoluteBox margin='small'>
          {showTools && (<ImageTools />)}
        </AbsoluteBox>
        <SubjectViewer
          rotation={store.image.rotation}
          scale={store.image.scale}
          translateX={store.image.translateX}
          translateY={store.image.translateY}
        />
      </RelativeBox>
    </Box>
  )
}

export default observer(SubjectViewerContainer)
