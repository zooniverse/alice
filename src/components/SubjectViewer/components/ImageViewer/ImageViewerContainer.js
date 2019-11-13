import React from 'react'
import ImageViewer from './ImageViewer'
import AppContext from 'store'

function ImageViewerContainer({ boundingBox, url }) {
  console.log(url);
  const store = React.useContext(AppContext)
  const imageViewer = React.useRef(null)
  const [dimensions, setDimensions] = React.useState({})

  function onLoad(event) {
    console.log('LOADED');
  }

  function fetchImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  React.useEffect(() => {
    async function handleSubject() {
      const img = await fetchImage(url)
      const svg = imageViewer.current
      setDimensions({
        clientHeight: svg.clientHeight,
        clientWidth: svg.clientWidth,
        naturalHeight: img.naturalHeight,
        naturalWidth: img.naturalWidth
      })
    }
    handleSubject()
  }, [url])
  const { naturalWidth, naturalHeight } = dimensions
  console.log(boundingBox.width, boundingBox.height);
  console.log(dimensions);

  return (
    <ImageViewer
      ref={imageViewer}
      height={naturalHeight}
      width={naturalWidth}
      onLoad={onLoad}
      url={url}
    />
  )
}

export default ImageViewerContainer
