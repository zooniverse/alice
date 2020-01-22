import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { constructText } from 'helpers/parseTranscriptionData'
import LineViewer from './LineViewer'

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const [selectedItem, setItem] = React.useState()
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const subjectIndex = store.subjects.index
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text.get(`frame${subjectIndex}`)[transcriptionIndex]
  const consensusText = reduction && (reduction.edited_consensus_text || reduction.consensus_text)

  const [transcriptionOptions, setTranscriptionOptions] = React.useState([])

  React.useEffect(() => {
    const transcriptionArray = constructText(reduction).map((text, i) => {
      return {
        date: '',
        goldStandard: (reduction.gold_standard && reduction.gold_standard[i]) || false,
        userName: 'Anonymous',
        text
      }
    })
    setTranscriptionOptions(transcriptionArray)
  }, [reduction])

  return (
    <LineViewer
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      reduction={reduction}
      seen={reduction && reduction.seen}
      selectedItem={selectedItem}
      setItem={setItem}
      transcriptionOptions={transcriptionOptions}
    />
  )
}

export default observer(LineViewerContainer)
