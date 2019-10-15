import React from 'react'
import FilmstripViewer from './FilmstripViewer'

export default function FilmstripViewerContainer({ images }) {
  const [isOpen, setOpen] = React.useState(true)
  return <FilmstripViewer images={images} isOpen={isOpen} onToggle={setOpen} />
}
