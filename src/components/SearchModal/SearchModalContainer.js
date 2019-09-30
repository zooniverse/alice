import React from 'react'
import SearchModal from './SearchModal'
import { useLocalStore } from 'mobx-react'

function SearchModalContainer() {
  const store = useLocalStore(() => ({
    id: 'ZOONIVERSE ID',
    toggleID: (e, id) => {
      console.log(e, id);
      store.id = id
    }
  }))
  return <SearchModal searchID={store.id} toggleID={store.toggleID} />
}

export default SearchModalContainer
