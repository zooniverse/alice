import React from 'react'
import HeaderButton from './HeaderButton'

export default function SearchButtonContainer() {
  const onClick = e => { console.log('Search Button Pressed') }
  return (
    <HeaderButton
      label={'Search'}
      onClick={onClick}
    />
  )
}
