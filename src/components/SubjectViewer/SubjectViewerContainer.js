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

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  const [showTools, setTools] = React.useState(false)
  const onMouseOver = e => setTools(true)
  const onMouseLeave = e => setTools(false)
  const src = findCurrentSrc(store.subject.current.locations, store.subject.index)

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
        <SubjectViewer
          error={store.subject.error}
          rotation={store.image.rotation}
          scale={store.image.scale}
          src={src}
          subjectState={store.subject.asyncState}
          translateX={store.image.translateX}
          translateY={store.image.translateY}
        />
      </RelativeBox>
    </Box>
  )
}

export default observer(SubjectViewerContainer)
