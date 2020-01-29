import React from 'react'
import { array, string } from 'prop-types'
import indexToRainbow from 'helpers/indexToRainbow'

const CIRCLE_WIDTH = 10

function AnnotationsPane({ lines, isExtract, x, y }) {
  const offset = `translate(${x}, ${y})`
  const dashArray = isExtract ? '5' : '0'

  return (
    <g transform={offset}>
      {lines.map((line, index) => {
        const color = isExtract ? 'white' : indexToRainbow(index % 11)
        const svgPoints = []
        const svgLines = []

        for (let i = 0; i < line.length; i++) {
          const point = line[i]
          const fill = i === 0 ? color : 'transparent'
          svgPoints.push(
            <circle
              key={`SVG_DOT_${i}`}
              cx={point.x}
              cy={point.y}
              r={CIRCLE_WIDTH}
              fill={fill}
              stroke={color}
              strokeWidth='2'
            />
          )
          if (i > 0) {
            const prevPoint = line[i -1]
            const x1 = prevPoint.x
            let x2 = point.x
            const isLeftToRight = x1 < x2
            isLeftToRight ? x2 -= CIRCLE_WIDTH : x2 += CIRCLE_WIDTH

            svgLines.push(
              <line
                key={`SVG_LINE_${i}`}
                x1={x1} y1={prevPoint.y}
                x2={x2} y2={point.y}
                stroke={color} strokeWidth="2"
                strokeDasharray={dashArray}
              />
            )
          }
        }

        return (
          <g key={`TRANSCRIPTION_${index}`}>
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
