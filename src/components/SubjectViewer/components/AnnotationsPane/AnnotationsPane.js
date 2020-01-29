import React from 'react'
import { array, string } from 'prop-types'
import SVGLines from './SVGLines'

function AnnotationsPane({ extractLines, reductionLines, isExtract, x, y }) {
  const offset = `translate(${x}, ${y})`

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
  lines: array,
  offset: string
}

AnnotationsPane.defaultProps = {
  lines: [],
  offset: ''
}

export default AnnotationsPane
