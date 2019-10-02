import React from 'react'
import styled from 'styled-components'
import InteractionLayer from './components/InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  transform-origin: 50% 50%;
`

function SubjectViewer ({ ref, rotation, scale, translateX, translateY, url }) {
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`

  return (
    <SVG ref={ref} viewBox="0 0 100 100">
      <G transform={transform}>
        <image
          height='100%'
          width='100%'
          xlinkHref={'https://via.placeholder.com/150'}
        />
      </G>
      <InteractionLayer />
    </SVG>
  )
}

export default SubjectViewer
