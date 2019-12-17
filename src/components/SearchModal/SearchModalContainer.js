import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import SearchModal from './SearchModal'

const TYPES = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  INTERNAL: 'INTERNAL ID'
}

const initialValues = {
  id: null,
  type: '',
  unseen: false,
  in_progress: false,
  ready: false,
  approved: false,
  flagged: false,
  low_consensus: false,
}

function SearchModalContainer() {
  const [value, setValue] = React.useState('Select...');
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')
  const onSubmit = args => store.search.searchTranscriptions(args);

  return (
    <SearchModal
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={onSubmit}
      options={[ TYPES.ZOONIVERSE, TYPES.INTERNAL ]}
      setValue={setValue}
      types={TYPES}
      value={value}
    />
  )
}

export { TYPES }
export default observer(SearchModalContainer)
