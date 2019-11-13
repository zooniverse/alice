import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const ImageViewer = React.forwardRef(function ImageViewer ({ height, width, onLoad, url }, ref) {

  return (
    <SVG ref={ref}>
      <image
        height={height}
        width={width}
        xlinkHref={url}
        onLoad={onLoad}
      />
    </SVG>
  )
})

export default ImageViewer
