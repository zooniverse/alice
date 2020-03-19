import React from 'react'
import AppContext from 'store'
import { Box } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import { observer } from 'mobx-react'
import SVGView from './SVGView'

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SVGViewContainer () {
  const store = React.useContext(AppContext)
  const { asyncState } = store.subjects
  const disableInteraction = asyncState !== ASYNC_STATES.READY
  const svgEl = React.useRef(null)
  const [img, setImg] = React.useState(new Image())
  const src = findCurrentSrc(store.subjects.current.locations, store.transcriptions.index)
  const [naturalWidth, setNaturalWidth] = React.useState(0)
  const [naturalHeight, setNaturalHeight] = React.useState(0)

  React.useEffect(() => {
    async function fetchImage() {
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(img)
        img.src = src
        return img
      })
    }

    async function preLoad() {
      const image = await fetchImage()
      setImg(image)
      return image
    }

    async function getImageSize() {
      const image = await preLoad()
      const svg = svgEl.current || {}
      setNaturalWidth(image.naturalWidth)
      setNaturalHeight(image.naturalHeight)
      return {
        clientHeight: svg.clientHeight,
        clientWidth: svg.clientWidth,
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth
      }
    }

    async function onLoad() {
      const target = await getImageSize()
      store.image.setScale(target)
    };
    onLoad();
  }, [img, src, store.image])

  const transform = `scale(${store.image.scale}) translate(${store.image.translateX}, ${store.image.translateY}) rotate(${store.image.rotation})`
  if (src.length === 0 || asyncState !== ASYNC_STATES.READY) return null;

  return (
    <Box ref={svgEl} fill>
      <SVGView
        disabled={disableInteraction}
        height={naturalHeight}
        transform={transform}
        url={src}
        width={naturalWidth}
      />
    </Box>
  )
}

export default observer(SVGViewContainer)
