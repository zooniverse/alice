import React from 'react'
import { array, string } from 'prop-types'

function AnnotationsPane({ lines, x, y }) {
  const offset = `translate(${x}, ${y})`

  return (
    <g transform={offset}>
      {lines.map((line, i) => {
        const svgPoints = []
        const svgLines = []

        for (let i = 0; i < line.length; i++) {
          const point = line[i]
          svgPoints.push(
            <circle
              key={`SVG_DOT_${i}`}
              cx={point.x} cy={point.y} r={10} fill="#FF0000"
            />
          )
          if (i > 0) {
            const prevPoint = line[i -1]
            svgLines.push(
              <line
                key={`SVG_LINE_${i}`}
                x1={prevPoint.x} y1={prevPoint.y}
                x2={point.x} y2={point.y}
                stroke="#FF0000" strokeWidth="2"
              />
            )
          }
        }

        return (
          <g key={`TRANSCRIPTION_${i}`}>
            {svgLines}
            {svgPoints}
          </g>
        )
      })}
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
