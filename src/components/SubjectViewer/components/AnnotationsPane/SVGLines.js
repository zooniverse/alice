import React from 'react'
import { array, bool, number } from 'prop-types'
import indexToColor from 'helpers/indexToColor'

export default function SVGLines({ lines, isExtract, reductionIndex }) {
  const circleWidth = isExtract ? 4 : 10
  const dashArray = isExtract ? '4' : '0'
  const strokeWidth = isExtract ? '0.5' : '3'

  return (
    <g>
      {lines.map((line, index) => {
        const color = indexToColor(reductionIndex)
        const svgPoints = []
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

        const svgLines = (
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
  isExtract: bool,
  lines: array,
  reductionIndex: number
}

SVGLines.defaultProps = {
  isExtract: false,
  lines: [],
  reductionIndex: 0
}
