import React from 'react'
import { array, bool, func, number } from 'prop-types'
import indexToColor from 'helpers/indexToColor'
import styled from 'styled-components'

const G = styled('g')`
  cursor: ${props => props.clickable ? 'pointer' : 'inherit'};
`

export default function SVGLines({ activeTranscriptionIndex, lines, onLineClick, isExtract, reductionIndex }) {
  const circleWidth = isExtract ? 4 : 10
  const dashArray = isExtract ? '4' : '0'
  const strokeWidth = isExtract ? '0.5' : '3'

  const isActive = reductionIndex === activeTranscriptionIndex
  if (Number.isInteger(activeTranscriptionIndex) && !isActive) return null

  return (
    <G clickable={!isExtract} onClick={onLineClick}>
      {lines.map((line, index) => {
        const color = isExtract && isActive ? indexToColor(index) : indexToColor(reductionIndex)
        const svgPoints = []
        const isLeftToRight = line.x1 < line.x2
        const endLinePos = isLeftToRight ? line.x2 - circleWidth : line.x2 + circleWidth

        svgPoints.push(
          <circle
            key={`SVG_DOT_${index}_1`}
            cx={line.x1}
            cy={line.y1}
            r={circleWidth}
            fill='transparent'
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
            fill={color}
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
            <line
              key={`SVG_LINE_${index}_bonus`}
              x1={line.x1} y1={line.y1}
              x2={endLinePos} y2={line.y2}
              stroke={'transparent'} strokeWidth={strokeWidth * 10}
            />
            {svgLines}
            {svgPoints}
          </g>
        )
      })}
    </G>
  )
}

SVGLines.propTypes = {
  isExtract: bool,
  lines: array,
  onLineClick: func,
  reductionIndex: number
}

SVGLines.defaultProps = {
  isExtract: false,
  lines: [],
  onLineClick: () => {},
  reductionIndex: 0
}
