import React from 'react'
import styled from 'styled-components'
import { number, string } from 'prop-types'
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

export default function SubjectViewer ({ rotation, scale, src, translateX, translateY }) {
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

SubjectViewer.propTypes = {
  rotation: number,
  scale: number,
  src: string,
  translateX: number,
  translateY: number
}

SubjectViewer.defaultProps = {
  rotation: 0,
  scale: 0,
  src: '',
  translateX: 0,
  translateY: 0
}
