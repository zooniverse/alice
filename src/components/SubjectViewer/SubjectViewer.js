import React from 'react'
import styled from 'styled-components'
import { bool, number, string } from 'prop-types'
import ASYNC_STATES from 'helpers/asyncStates'
import AppContext from 'store'
import { observer } from 'mobx-react'
import InteractionLayer from './components/InteractionLayer'
import AnnotationsPane from './components/AnnotationsPane'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const G = styled.g`
  transform-origin: 50% 50%;
  :hover {
    cursor: ${props => props.disabled ? 'default' : 'move'};
  }
`

function SubjectViewer ({ disabled, error, rotation, scale, src, subjectState, translateX, translateY }) {
  const store = React.useContext(AppContext)
  const transform = `scale(${scale}) translate(${translateX}, ${translateY}) rotate(${rotation})`
  const svgEl = React.useRef(null);
  const sectionEl = React.useRef(null);
  const boundingBox = (svgEl && svgEl.current && svgEl.current.getBoundingClientRect());
  const disableInteraction = subjectState !== ASYNC_STATES.READY

  React.useEffect(() => {
    const ARBITRARY_OFFSET = 2;
    const w = sectionEl.current.clientWidth - ARBITRARY_OFFSET;
    const h = sectionEl.current.clientHeight - ARBITRARY_OFFSET;

    svgEl.current.setAttribute('viewBox', `${-w/2} ${(-h/2)} ${w} ${h}`)
    svgEl.current.style.width = w + 'px'
    svgEl.current.style.height = h + 'px'

    const boundingBox = sectionEl.current.getBoundingClientRect();
    const svgW = boundingBox.width;
    const svgH = boundingBox.height;
    store.editor.updateViewerSize(svgW, svgH)
  }, [store.editor])

  return (
    <section ref={sectionEl}>
      <svg ref={svgEl} viewBox="0 0 100 100">
        <G disabled={disableInteraction} transform={transform}>
          <image height="500" xlinkHref={src}
          />
          {subjectState === ASYNC_STATES.LOADING && (
            <text x="50%" y="50%" textAnchor='middle'>Loading Subject...</text>
          )}
          {subjectState === ASYNC_STATES.ERROR && (
            <text x="50%" y="50%" fill='red' textAnchor='middle'>{`Error: ${error}`}</text>
          )}
          <InteractionLayer boundingBox={boundingBox} disabled={disableInteraction} />
          <AnnotationsPane />
        </G>
      </svg>
    </section>
  )
}

SubjectViewer.propTypes = {
  disabled: bool,
  error: string,
  rotation: number,
  scale: number,
  src: string,
  translateX: number,
  translateY: number
}

SubjectViewer.defaultProps = {
  disabled: false,
  error: '',
  rotation: 0,
  scale: 0,
  src: '',
  translateX: 0,
  translateY: 0
}

export default observer(SubjectViewer)
