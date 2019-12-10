import React from 'react'
import HeaderButton from './HeaderButton'

export default function DownloadSetDataContainer({ disabled }) {
  const onClick = e => { console.log('Download Subject Set Button Pressed') }
  return (
    <HeaderButton
      disabled={disabled}
      label='Download Approved Subject Set Data'
      onClick={onClick}
    />
  )
}
