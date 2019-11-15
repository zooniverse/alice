import React from 'react'
import AppContext from 'store'
import { Box } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import { observer } from 'mobx-react'
import SVGImage from './SVGImage'

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SVGImageContainer () {
  const store = React.useContext(AppContext)
  const disableInteraction = store.subject.asyncState !== ASYNC_STATES.READY
  const svgEl = React.useRef(null)
  const [img, setImg] = React.useState(new Image())
  const src = findCurrentSrc(store.subject.current.locations, store.subject.index)

  React.useEffect(() => {
    async function fetchImage() {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.src = src
        return image
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
  }, [src, store.image])

  const { naturalHeight, naturalWidth } = img
  const transform = `scale(${store.image.scale}) translate(${store.image.translateX}, ${store.image.translateY}) rotate(${store.image.rotation})`

  if (src.length === 0) return null;

  return (
    <Box ref={svgEl} fill>
      <SVGImage
        disabled={disableInteraction}
        error={store.subject.error}
        height={naturalHeight}
        subjectState={store.subject.asyncState}
        transform={transform}
        url={src}
        width={naturalWidth}
      />
    </Box>
  )
}

export default observer(SVGImageContainer)
