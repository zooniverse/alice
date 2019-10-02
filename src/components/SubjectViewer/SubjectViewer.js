import React from 'react'
import styled from 'styled-components'
import InteractionLayer from './components/InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

function SubjectViewer ({ ref, scale, url }) {
  const transform = `scale(${scale})`
  return (
    <SVG ref={ref}>
      <g transform={transform}>
        <image
          height='100%'
          width='100%'
          xlinkHref={'https://via.placeholder.com/150'}
        />
      </g>
      <InteractionLayer />
    </SVG>
  )
}

export default SubjectViewer
