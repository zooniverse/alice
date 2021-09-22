import { useState, useContext } from 'react';
import { observer } from 'mobx-react'
import AppContext from 'store'
import SearchModal from './SearchModal'
import { TYPES } from 'store/SearchStore'

function SearchModalContainer() {
  const [value, setValue] = useState('Select...');
  const store = useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onSubmit = args => store.search.searchTranscriptions(args);

  return (
    <SearchModal
      initialValues={store.search}
      onClose={onClose}
      onSubmit={onSubmit}
      options={[ TYPES.ZOONIVERSE, TYPES.INTERNAL ]}
      setValue={setValue}
      types={TYPES}
      value={value}
    />
  )
}

export default observer(SearchModalContainer)
