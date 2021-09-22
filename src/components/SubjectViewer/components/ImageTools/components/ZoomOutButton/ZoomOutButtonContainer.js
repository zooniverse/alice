import { useContext } from 'react';
import AppContext from 'store'
import ZoomOutButton from './ZoomOutButton'

export default function ZoomOutButtonContainer() {
  const store = useContext(AppContext)
  return <ZoomOutButton onClick={store.image.zoomOut} />
}
