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

class SubjectViewerContainer extends React.Component {
  render() {
    return (
      <Box background={{ color: '#858585' }} height='large' width='large' round='xsmall'>
        <SubjectViewerHeader />
        <RelativeBox fill>
          <AbsoluteBox margin='small'>
            <ImageTools />
          </AbsoluteBox>
          <SubjectViewer />
        </RelativeBox>
      </Box>
    )
  }
}

SubjectViewerContainer.propTypes = {
}

SubjectViewerContainer.defaultProps = {
}

export default SubjectViewerContainer
