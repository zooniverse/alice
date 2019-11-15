import React from 'react'
import styled from 'styled-components'
import AppContext from 'store'
import AnnotationsPane from '../AnnotationsPane'
import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  :hover {
    cursor: ${props => props.disabled ? 'default' : 'move'};
  }
`

const SVGImage = function SVGImage ({ disabled, height, url, transform, width}) {
  const svgEl = React.useRef(null)
  const boundingBox = svgEl.current && svgEl.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2 || 0} ${-viewerHeight/2 || 0} ${viewerWidth || 0} ${viewerHeight || 0}`
  const adjustedHeight = height * -0.5
  const adjustedWidth = width * -0.5

  return (
    <SVG ref={svgEl} viewBox={viewBox}>
      <G disabled={disabled} transform={transform}>
        <image
          height={height}
          width={width}
          xlinkHref={url}
          x={adjustedWidth + 'px'}
          y={adjustedHeight + 'px'}
        />
        <AnnotationsPane x={adjustedWidth} y={adjustedHeight} />
        <InteractionLayer boundingBox={boundingBox} width={width} height={height} />
      </G>
    </SVG>
  )
}

export default SVGImage
