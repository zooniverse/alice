import React from 'react'
import styled from 'styled-components'
import { bool, string, number } from 'prop-types'
import AnnotationsPane from '../AnnotationsPane'
import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  :hover {
    cursor: move;
  }
`

const SVGView = React.forwardRef(function ({ disabled, height, url, transform, width}, ref) {
  if (url.length === 0 || disabled || !ref) return null;

  const boundingBox = ref.current && ref.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`

  return (
    <SVG viewBox={viewBox}>
      <G transform={transform}>
        <image
          height={height}
          width={width}
          xlinkHref={url}
          x={width * -0.5}
          y={height * -0.5}
        />
        <InteractionLayer boundingBox={boundingBox} width={width} height={height} />
        <AnnotationsPane x={width * -0.5} y={height * -0.5} />
      </G>
    </SVG>
  )
})

SVGView.propTypes = {
  disabled: bool,
  height: number,
  transform: string,
  url: string,
  width: number
}

SVGView.defaultProps = {
  disabled: true,
  height: 0,
  transform: '',
  url: '',
  width: 0
}

export default SVGView
