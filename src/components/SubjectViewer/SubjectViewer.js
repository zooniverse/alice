import React from 'react'
import styled from 'styled-components'
import { bool, number, string } from 'prop-types'
import ASYNC_STATES from 'helpers/asyncStates'
import { observer } from 'mobx-react'
import InteractionLayer from './components/InteractionLayer'
import AnnotationsPane from './components/AnnotationsPane'
import SVGImage from './components/SVGImage'

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

function SubjectViewer ({ error, rotation, scale, src, subjectState, translateX, translateY }) {
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`
  const disableInteraction = subjectState !== ASYNC_STATES.READY

  if (src.length === 0) return null;

  return <SVGImage src={src} disableInteraction={disableInteraction} transform={transform} />
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

export default observer(SubjectViewer)
