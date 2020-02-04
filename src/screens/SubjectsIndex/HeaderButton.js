import React from 'react'
import { Button, Text } from 'grommet'
import AppContext from 'store'

export default function HeaderButton ({ property, title }) {
  const store = React.useContext(AppContext)
  const sortItem = () => store.search.sort(property)

  return (
    <Button onClick={sortItem} plain>
      <Text>{title}</Text>
    </Button>
  )
}
