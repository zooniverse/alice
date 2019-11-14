import React from 'react'
import styled from 'styled-components'
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

const SVGImage = React.forwardRef(function SVGImage ({ disabled, height, url, transform, width}, ref) {
  const boundingBox = ref.current && ref.current.getBoundingClientRect()
  const viewBox = `0 0 ${width || 0} ${height || 0}`

  return (
    <SVG ref={ref} viewBox={viewBox}>
      <G disabled={disabled} transform={transform}>
        <image
          height='100%'
          width='100%'
          xlinkHref={url}
        />
        <AnnotationsPane />
        <InteractionLayer boundingBox={boundingBox} />
      </G>
    </SVG>
  )
})

export default SVGImage
