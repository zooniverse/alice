import React from 'react'
import { array, bool, number } from 'prop-types'
import SVGLines from './SVGLines'

function AnnotationsPane({
  extractLines,
  linesVisible,
  reductionLines,
  x,
  y
}) {
  const offset = `translate(${x}, ${y})`

  if (!linesVisible) return null

  return (
    <g transform={offset}>
      {reductionLines.map((lines, i) => (
        <SVGLines
          key={`SVG_LINE_${i}`}
          lines={lines}
          reductionIndex={i}
        />
      ))}
      {extractLines.map((lines, i) => (
        <SVGLines
          key={`SVG_LINE_${i}`}
          isExtract
          lines={lines}
          reductionIndex={i}
        />
      ))}
    </g>
  )
}

AnnotationsPane.propTypes = {
  extractLines: array,
  linesVisible: bool,
  reductionLines: array,
  x: number,
  y: number
}

AnnotationsPane.defaultProps = {
  extractLines: [],
  linesVisible: true,
  reductionLines: [],
  x: 0,
  y: 0
}

export default AnnotationsPane
