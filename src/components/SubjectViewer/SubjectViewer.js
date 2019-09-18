import React from 'react'
import styled from 'styled-components'
import InteractionLayer from './components/InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

function SubjectViewer ({ ref, url }) {
  return (
    <SVG ref={ref}>
      <image
        height='100%'
        width='100%'
        xlinkHref={'https://via.placeholder.com/150'}
      />
      <InteractionLayer />
    </SVG>
  )
}

SubjectViewer.defaultProps = {
}

SubjectViewer.propTypes = {
}

export default SubjectViewer
