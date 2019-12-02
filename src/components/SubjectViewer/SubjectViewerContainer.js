import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import AppContext from 'store'
import SubjectViewerHeader from './components/SubjectViewerHeader'
import ImageTools from './components/ImageTools'
import SVGView from './components/SVGView'
import AsyncMessages from './components/AsyncMessages'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
`

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
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
        <AbsoluteBox fill>
          <AsyncMessages error={store.subjects.error} subjectState={store.subjects.asyncState} />
          <AbsoluteBox>
            {showTools && <ImageTools />}
          </AbsoluteBox>
        </AbsoluteBox>
        <SVGView />
      </RelativeBox>
    </Box>
  )
}

export default SubjectViewerContainer
