import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import SearchModal from './SearchModal'

const TYPES = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  EXTERNAL: 'EXTERNAL ID'
}

const initialValues = {
  id: null,
  type: '',
  unreviewed: false,
  inProgress: false,
  readyForReview: false,
  approved: false,
  flagged: false,
  lowConsensus: false,
}

function onSubmit(e) {
  console.log(e);
}

function SearchModalContainer() {
  const [value, setValue] = React.useState('Select...');
  const store = React.useContext(AppContext)
  const onClose = () => store.modal.toggleModal('')

  return (
    <SearchModal
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={onSubmit}
      options={[ TYPES.ZOONIVERSE, TYPES.EXTERNAL ]}
      setValue={setValue}
      types={TYPES}
      value={value}
    />
  )
}

export { TYPES }
export default observer(SearchModalContainer)
