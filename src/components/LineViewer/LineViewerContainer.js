import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { constructText } from 'helpers/parseTranscriptionData'
import LineViewer from './LineViewer'

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const [inputText, setInputText] = React.useState('')
  const [selectedItem, setItem] = React.useState()
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text.get(`frame${store.subjects.index}`)[transcriptionIndex]
  const consensusText = reduction && (reduction.edited_consensus_text || reduction.consensus_text)
  const [transcriptionOptions, setTranscriptionOptions] = React.useState([])
  const typedChoice = transcriptionOptions.length + 1
  const onSetItem = (item) => {
    if (item !== typedChoice && inputText.length) {
      setInputText('')
    }
    setItem(item)
  }

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
      algorithmChoice={transcriptionOptions.length}
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      inputText={inputText}
      reduction={reduction}
      seen={reduction && reduction.seen}
      selectedItem={selectedItem}
      setInputText={setInputText}
      setItem={onSetItem}
      transcriptionOptions={transcriptionOptions}
      typedChoice={typedChoice}
    />
  )
}

export default observer(LineViewerContainer)
