import React from 'react'
import AppContext from 'store'
import { Box, Text } from 'grommet'
import SearchTag from './SearchTag'

function SearchTagContainer() {
  const store = React.useContext(AppContext)
  const activeTags = Object.keys(store.search).filter(key => store.search[key] || store.search[key].length > 0);

  return (
    <Box>
      <Text>Search Results</Text>
      {activeTags.map(tag => <SearchTag key={`SEARCH_TAG_${tag}`} clearTag={store.search.clearTag} tag={tag}/>)}
    </Box>
  )
}

export default SearchTagContainer
