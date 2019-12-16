import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import TranscriptionTable from './TranscriptionTable'
import data from './mockData'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)

  return (
    <TranscriptionTable
      data={data}
      toggleTranscription={store.aggregations.toggleTranscription}
    />
  )
}

export default observer(TranscriptionTableContainer)
