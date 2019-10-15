import React from 'react'
import styled from 'styled-components'
import InteractionLayer from './components/InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  transform-origin: 50% 50%;
  :hover {
    cursor: move;
  }
`

function SubjectViewer ({ rotation, scale, src, translateX, translateY }) {
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`
  const inputEl = React.useRef(null);
  const boundingBox = (inputEl && inputEl.current && inputEl.current.getBoundingClientRect());

  return (
    <SVG ref={inputEl}>
      <G transform={transform}>
        <image
          height='100%'
          width='100%'
          xlinkHref={src}
        />
        <InteractionLayer boundingBox={boundingBox} />
      </G>
    </SVG>
  )
}

export default SubjectViewer
