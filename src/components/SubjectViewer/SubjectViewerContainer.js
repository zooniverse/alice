import React from 'react'
import { Box } from 'grommet'
import SubjectViewer from './SubjectViewer'
import SubjectViewerHeader from './components/SubjectViewerHeader'

class SubjectViewerContainer extends React.Component {
  render() {
    return (
      <Box background={{ color: '#858585' }} height='large' width='large' round='xsmall'>
        <SubjectViewerHeader />
        <SubjectViewer />
      </Box>
    )
  }
}

SubjectViewerContainer.propTypes = {
}

SubjectViewerContainer.defaultProps = {
}

export default SubjectViewerContainer
