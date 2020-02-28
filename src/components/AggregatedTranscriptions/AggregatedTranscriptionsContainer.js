import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import AggregatedTranscriptions from './AggregatedTranscriptions'

function AggregatedTranscriptionsContainer({ margin }) {
  const store = React.useContext(AppContext)

  const addLine = () => {
    const currentPage = store.transcriptions.current.text.get(`frame${store.subjects.index}`)
    store.transcriptions.setActiveTranscription(currentPage.length)
  }
  const showOverlay = store.aggregations.showModal || store.transcriptions.approved
  const showTranscription = store.transcriptions.activeTranscriptionIndex !== undefined

  return (
    <AggregatedTranscriptions
      addLine={addLine}
      margin={margin}
      showOverlay={showOverlay}
      showTranscription={showTranscription}
    />
  )
}

export default observer(AggregatedTranscriptionsContainer)
