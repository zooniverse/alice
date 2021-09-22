import { useContext } from 'react';
import AppContext from 'store'
import ZoomInButton from './ZoomInButton'

export default function ZoomInButtonContainer() {
  const store = useContext(AppContext)
  return <ZoomInButton onClick={store.image.zoomIn} />
}
