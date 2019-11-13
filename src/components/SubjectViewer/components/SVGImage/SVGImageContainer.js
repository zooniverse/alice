import React from 'react'
import SVGImage from './SVGImage'

function SVGImageContainer({ src }) {
  const imageViewer = React.useRef(null)
  const [img, setImg] = React.useState(null)

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
      debugger
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

  return (
    <SVGImage
      ref={imageViewer}
      url={src}
    />
  )
}

export default SVGImageContainer
