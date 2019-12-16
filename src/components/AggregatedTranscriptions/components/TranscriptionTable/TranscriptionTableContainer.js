import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import TranscriptionTable from './TranscriptionTable'
import data from './mockData'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const toggleTranscription = () => {
    store.aggregations.toggleTranscription()
  }

  return (
    <TranscriptionTable
      data={data}
      toggleTranscription={toggleTranscription}
    />
  )
}

export default observer(TranscriptionTableContainer)
