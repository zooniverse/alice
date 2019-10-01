import React from 'react'
import SearchModal from './SearchModal'
import { observer } from 'mobx-react'

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
  return (
    <SearchModal
      initialValues={initialValues}
      onSubmit={onSubmit}
      options={[ TYPES.ZOONIVERSE, TYPES.EXTERNAL ]}
      setValue={setValue}
      types={TYPES}
      value={value}
    />
  )
}

export default observer(SearchModalContainer)
