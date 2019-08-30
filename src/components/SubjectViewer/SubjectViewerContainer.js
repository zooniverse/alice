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
  constructor(props) {
    super(props)

    this.state = {
        showImageTools: false
    }

    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseOver() {
    this.setState({ showImageTools: true })
  }

  onMouseLeave() {
    this.setState({ showImageTools: false })
  }

  render() {
    const { showImageTools } = this.state;

    return (
      <Box onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} background={{ color: '#858585' }} height='large' width='large' round='xsmall'>
        <SubjectViewerHeader />
        <RelativeBox fill>
          <AbsoluteBox margin='small'>
            {showImageTools && (<ImageTools />)}
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
