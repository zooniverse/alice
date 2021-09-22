import { useContext } from 'react';
import AppContext from 'store'
import RotateButton from './RotateButton'

export default function RotateButtonContainer() {
  const store = useContext(AppContext)
  return <RotateButton onClick={store.image.rotate} />
}
