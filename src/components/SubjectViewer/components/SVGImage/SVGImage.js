import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const SVGImage = React.forwardRef(function SVGImage ({ height, url, width}, ref) {
  const viewBox = `0 0 ${width || 0} ${height || 0}`

  return (
    <SVG ref={ref}>
      <image
        height='100%'
        width='100%'
        xlinkHref={url}
      />
    </SVG>
  )
})

export default SVGImage
