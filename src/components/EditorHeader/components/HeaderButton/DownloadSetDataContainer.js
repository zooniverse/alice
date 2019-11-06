import React from 'react'
import HeaderButton from './HeaderButton'

export default function DownloadSetDataContainer() {
  const onClick = e => { console.log('Download Subject Set Button Pressed') }
  return (
    <HeaderButton
      label='Download Approved Subject Set Data'
      onClick={onClick}
    />
  )
}
