import React from 'react'
import SVGImage from './SVGImage'

function SVGImageContainer({ disableInteraction, src, transform }) {
  const imageViewer = React.useRef(null)
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
      const imgage = await fetchImage()
      setImg(imgage)
      return imgage
    }

    async function getImageSize() {
      const image = await preLoad()
      const svg = imageViewer.current || {}
      return {
        clientHeight: svg.clientHeight,
        clientWidth: svg.clientWidth,
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth
      }
    }

    async function onLoad() {
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await getImageSize()
      console.log(clientHeight, clientWidth, naturalHeight, naturalWidth);
    };
    onLoad();
  }, [])

  const { naturalHeight, naturalWidth } = img

  return (
    <SVGImage
      disabled={disableInteraction}
      ref={imageViewer}
      height={naturalHeight}
      width={naturalWidth}
      transform={transform}
      url={src}
    />
  )
}

export default SVGImageContainer
