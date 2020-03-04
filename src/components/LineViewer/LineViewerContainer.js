import React from 'react'
import AppContext from 'store'
import { observer, useLocalStore } from 'mobx-react'
import { constructText } from 'helpers/parseTranscriptionData'
import LineViewer from './LineViewer'

function LineViewerContainer() {
  const store = React.useContext(AppContext)

  const localStore = useLocalStore(() => ({
    inputText: '',
    selectedItem: null,
    setInputText(text) {
      localStore.inputText = text
    },
    setItem(item) {
      localStore.selectedItem = item
    },
    setTranscriptionOptions(options) {
      localStore.transcriptionOptions = options
    },
    showDeleteModal: false,
    toggleDeleteModal() {
      localStore.showDeleteModal = !localStore.showDeleteModal
    },
    transcriptionOptions: []
  }))

  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text.get(`frame${store.transcriptions.index}`)[transcriptionIndex]
  const consensusText = reduction && (reduction.edited_consensus_text || reduction.consensus_text)
  const typedChoice = localStore.transcriptionOptions.length + 1
  const onSetItem = (item) => {
    if (item !== typedChoice && localStore.inputText.length) {
      localStore.setInputText('')
    }
    localStore.setItem(item)
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
    localStore.setTranscriptionOptions(transcriptionArray)
  }, [localStore, reduction])

  return (
    <LineViewer
      algorithmChoice={localStore.transcriptionOptions.length}
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      inputText={localStore.inputText}
      reduction={reduction}
      seen={reduction && reduction.seen}
      selectedItem={localStore.selectedItem}
      setInputText={localStore.setInputText}
      setItem={onSetItem}
      showDeleteModal={localStore.showDeleteModal}
      toggleDeleteModal={localStore.toggleDeleteModal}
      transcriptionOptions={localStore.transcriptionOptions}
      typedChoice={typedChoice}
    />
  )
}

export default observer(LineViewerContainer)
