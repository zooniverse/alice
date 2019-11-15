import React from 'react'
import AppContext from 'store'
import { Box } from 'grommet'
import SVGImage from './SVGImage'

const SVGImageContainer = React.forwardRef(function SVGImageContainer({ disableInteraction, src, transform }, ref) {
  const store = React.useContext(AppContext)
  const [img, setImg] = React.useState(new Image())

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
      const svg = ref.current || {}
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
  }, [])

  const { naturalHeight, naturalWidth } = img

  return (
    <Box ref={ref} fill>
      <SVGImage
        disabled={disableInteraction}
        height={naturalHeight}
        width={naturalWidth}
        transform={transform}
        url={src}
      />
    </Box>
  )
})

export default SVGImageContainer
