import React from 'react'
import styled from 'styled-components'
import { bool, string, number } from 'prop-types'
import ASYNC_STATES from 'helpers/asyncStates'
import AnnotationsPane from '../AnnotationsPane'
import InteractionLayer from '../InteractionLayer'
import AsyncMessages from '../AsyncMessages'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  :hover {
    cursor: ${props => props.disabled ? 'default' : 'move'};
  }
`

function SVGView ({ disabled, error, height, url, subjectState, transform, width}) {
  const svgEl = React.useRef(null)
  const boundingBox = svgEl.current && svgEl.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`

  return (
    <SVG ref={svgEl} viewBox={viewBox}>
      <G disabled={disabled} transform={transform}>
        <image
          height={height}
          width={width}
          xlinkHref={url}
          x={width * -0.5}
          y={height * -0.5}
        />
        <AnnotationsPane x={width * -0.5} y={height * -0.5} />
        <InteractionLayer boundingBox={boundingBox} width={width} height={height} />
      </G>
      <AsyncMessages error={error} subjectState={subjectState} />
    </SVG>
  )
}

SVGView.propTypes = {
  disabled: bool,
  error: string,
  height: number,
  subjectState: string,
  transform: string,
  url: string,
  width: number
}

SVGView.defaultProps = {
  disabled: true,
  error: '',
  height: 0,
  subjectState: ASYNC_STATES.IDLE,
  transform: '',
  url: '',
  width: number
}

export default SVGView
