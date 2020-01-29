import React from 'react'
import { array, string } from 'prop-types'
import indexToRainbow from 'helpers/indexToRainbow'

function SVGLines({ lines, isExtract, reductionIndex }) {
  const circleWidth = isExtract ? 4 : 10
  const dashArray = isExtract ? '4' : '0'
  const strokeWidth = isExtract ? '0.5' : '3'

  return (
    <g>
      {lines.map((line, index) => {
        const color = indexToRainbow(reductionIndex % 12)
        const svgPoints = []
        const svgLines = []
        const isLeftToRight = line.x1 < line.x2
        const endLinePos = isLeftToRight ? line.x2 - circleWidth : line.x2 + circleWidth

        svgPoints.push(
          <circle
            key={`SVG_DOT_${index}_1`}
            cx={line.x1}
            cy={line.y1}
            r={circleWidth}
            fill={color}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        )
        svgPoints.push(
          <circle
            key={`SVG_DOT_${index}_2`}
            cx={line.x2}
            cy={line.y2}
            r={circleWidth}
            fill='transparent'
            stroke={color}
            strokeWidth={strokeWidth}
          />
        )

        svgLines.push(
          <line
            key={`SVG_LINE_${index}`}
            x1={line.x1} y1={line.y1}
            x2={endLinePos} y2={line.y2}
            stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
          />
        )

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

SVGLines.propTypes = {
  lines: array,
  offset: string
}

SVGLines.defaultProps = {
  lines: [],
  offset: ''
}

export default SVGLines
