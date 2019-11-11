import React from 'react'
import styled from 'styled-components'
import { bool, number, string } from 'prop-types'
import ASYNC_STATES from 'helpers/asyncStates'
import InteractionLayer from './components/InteractionLayer'
import AnnotationsPane from './components/AnnotationsPane'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  transform-origin: 50% 50%;
  :hover {
    cursor: ${props => props.disabled ? 'default' : 'move'};
  }
`

export default function SubjectViewer ({ disabled, error, rotation, scale, src, subjectState, translateX, translateY }) {
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`
  const inputEl = React.useRef(null);
  const boundingBox = (inputEl && inputEl.current && inputEl.current.getBoundingClientRect());
  const disableInteraction = subjectState !== ASYNC_STATES.READY || disabled

  return (
    <SVG ref={inputEl}>
      <G disabled={disableInteraction} transform={transform}>
        <image
          height='100%'
          width='100%'
          xlinkHref={src}
        />
        {subjectState === ASYNC_STATES.LOADING && (
          <text x="50%" y="50%" textAnchor='middle'>Loading Subject...</text>
        )}
        {subjectState === ASYNC_STATES.ERROR && (
          <text x="50%" y="50%" fill='red' textAnchor='middle'>{`Error: ${error}`}</text>
        )}
        <InteractionLayer boundingBox={boundingBox} disabled={disableInteraction} />
        <AnnotationsPane />
      </G>
    </SVG>
  )
}

SubjectViewer.propTypes = {
  disabled: bool,
  error: string,
  rotation: number,
  scale: number,
  src: string,
  translateX: number,
  translateY: number
}

SubjectViewer.defaultProps = {
  disabled: false,
  error: '',
  rotation: 0,
  scale: 0,
  src: '',
  translateX: 0,
  translateY: 0
}
