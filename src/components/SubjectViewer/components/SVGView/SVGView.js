import React from 'react'
import styled from 'styled-components'
import { bool, string, number } from 'prop-types'
import AppContext from 'store'
import AnnotationsPane from '../AnnotationsPane'

let startingPos = { x: 0, y: 0 }

const SVG = styled.svg`
  height: 100%;
  width: 100%;

  :hover {
    cursor: move;
  }
`

const SVGView = React.forwardRef(function ({ disabled, height, url, transform, width}, ref) {
  if (url.length === 0 || disabled || !ref) return null;

  const store = React.useContext(AppContext)
  const [isMoving, setMove] = React.useState(false)

  const boundingBox = ref.current && ref.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`

  const onMouseDown = e => {
    startingPos = { x: e.clientX, y: e.clientY }
    setMove(true)
  }
  const onMouseMove = e => {
    if (!isMoving) return

    const difference = {
      x: (e.clientX - startingPos.x) / store.image.scale,
      y: (e.clientY - startingPos.y) / store.image.scale
    }
    startingPos = { x: e.clientX, y: e.clientY }
    store.image.setTranslate(difference)
  }

  return (
    <SVG
      onMouseDown={onMouseDown}
      onMouseLeave={() => setMove(false)}
      onMouseMove={onMouseMove}
      onMouseUp={() => setMove(false)}
      viewBox={viewBox}
    >
      <g transform={transform}>
        <image
          height={height}
          width={width}
          xlinkHref={url}
          x={width * -0.5}
          y={height * -0.5}
        />
        <AnnotationsPane x={width * -0.5} y={height * -0.5} />
      </g>
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
