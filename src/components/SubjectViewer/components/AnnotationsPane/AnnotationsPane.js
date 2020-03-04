import React from 'react'
import { array, bool, func, number } from 'prop-types'
import SVGLines from './SVGLines'

export default function AnnotationsPane({
  extractLines,
  linesVisible,
  onLineClick,
  reductionLines,
  x,
  y
}) {
  const offset = `translate(${x}, ${y})`

  if (!linesVisible) return null

  return (
    <g transform={offset}>
      {extractLines.map((lines, i) => (
        <SVGLines
          key={`SVG_LINE_${i}`}
          isExtract
          lines={lines}
          reductionIndex={i}
        />
      ))}
      {reductionLines.map((lines, i) => (
        <SVGLines
          key={`SVG_LINE_${i}`}
          lines={lines}
          onLineClick={() => onLineClick(i)}
          reductionIndex={i}
        />
      ))}
    </g>
  )
}

AnnotationsPane.propTypes = {
  extractLines: array,
  linesVisible: bool,
  onLineClick: func,
  reductionLines: array,
  x: number,
  y: number
}

AnnotationsPane.defaultProps = {
  extractLines: [],
  linesVisible: true,
  onLineClick: () => {},
  reductionLines: [],
  x: 0,
  y: 0
}
