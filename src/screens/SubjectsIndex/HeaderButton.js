import React from 'react'
import { Button, Text } from 'grommet'
import AppContext from 'store'
import { Down, Up } from 'grommet-icons'

export default function HeaderButton ({ property, title }) {
  const store = React.useContext(AppContext)
  const sortItem = () => store.search.sort(property)
  const sortDirection = store.search[`sort_${property}`]

  let icon
  if (sortDirection === 1) {
    icon = <Down size='small' />
  } else if (sortDirection === 2) {
    icon = <Up size='small' />
  }

  return (
    <Button
      icon={icon}
      label={<Text>{title}</Text>}
      onClick={sortItem}
      plain
      gap='xsmall'
      reverse
    />
  )
}
