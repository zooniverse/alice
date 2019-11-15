import React from 'react'
import { number, string } from 'prop-types'
import { observer } from 'mobx-react'
import SVGImage from './components/SVGImage'

function SubjectViewer ({ error, rotation, scale, src, subjectState, translateX, translateY }) {
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`

  return <SVGImage src={src} transform={transform} />
}

SubjectViewer.propTypes = {
  error: string,
  rotation: number,
  scale: number,
  src: string,
  translateX: number,
  translateY: number
}

SubjectViewer.defaultProps = {
  error: '',
  rotation: 0,
  scale: 0,
  src: '',
  translateX: 0,
  translateY: 0
}

export default observer(SubjectViewer)
