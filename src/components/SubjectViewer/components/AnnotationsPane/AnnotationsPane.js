import React from 'react'
import { array, string } from 'prop-types'

function AnnotationsPane({ lines, offset }) {
  console.log(lines);
  return (
    <g>
      <text x="500" y="127" fill="#fff">
        Hi Everybody!
      </text>
      {lines.map((line, i) => {
        const svgPoints = []

        for (let i = 0; i < line.length; i++) {
          const point = line[i]
          svgPoints.push(
            <circle
              key={`SVG_DOT_${i}`}
              cx={point.x} cy={point.y} r={10} fill="#FF0000"
            />
          )
        }

        return (
          <g key={`TRANSCRIPTION_${i}`}>
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
