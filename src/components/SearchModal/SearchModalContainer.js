import React from 'react'
import SearchModal from './SearchModal'
import { observer } from 'mobx-react'

const IDS = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  EXTERNAL: 'EXTERNAL ID'
}

function SearchModalContainer() {
  const [value, setValue] = React.useState('')
  return <SearchModal options={[IDS.ZOONIVERSE, IDS.EXTERNAL]} setValue={setValue} value={value} />
}

export default observer(SearchModalContainer)
