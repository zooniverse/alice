import { useContext } from 'react';
import AppContext from 'store'
import { Box, Text } from 'grommet'
import SearchTag from './SearchTag'

function SearchTagContainer() {
  const store = useContext(AppContext)
  const booleanTags = Object.keys(store.search).filter(key => store.search[key] === true);
  const idTag = store.search.id.length > 0 && store.search.type.length > 0

  return (
    <Box align='baseline' direction='row' gap='small'>
      <Text size='large'>Search Results</Text>
      {booleanTags.map(tag => {
        return (
          <SearchTag
            key={`SEARCH_TAG_${tag}`}
            clearTag={store.search.clearTag}
            tag={tag}
            value={store.search[tag].toString()}
          />
        )
      })}
      {idTag && <SearchTag clearTag={store.search.clearIdTags} tag={store.search.type} value={store.search.id} />}
    </Box>
  )
}

export default SearchTagContainer
