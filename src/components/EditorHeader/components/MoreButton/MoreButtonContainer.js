import React from 'react'
import MoreButton from './MoreButton'

export default function MoreButtonContainer() {
  const [isOpen, setOpen] = React.useState(false)

  return <MoreButton isOpen={isOpen} setOpen={setOpen} />
}
