import React from 'react'
import AppContext from 'store'
import { observer, useLocalStore } from 'mobx-react'
import { bool } from 'prop-types'
import LineViewer from './LineViewer'

function LineViewerContainer({ isLoaded }) {
  const store = React.useContext(AppContext)

  const localStore = useLocalStore(() => ({
    isLoaded,
    loadTranscription(state) {
      localStore.isLoaded = state
    },
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
    localStore.loadTranscription(false)
    if (store.transcriptions.parsedExtracts && transcriptionIndex !== undefined) {
      localStore.setTranscriptionOptions(store.transcriptions.parsedExtracts[transcriptionIndex])
    }
    localStore.loadTranscription(true)
  }, [localStore, store.transcriptions.parsedExtracts, transcriptionIndex])

  if (!localStore.isLoaded) return null

  return (
    <LineViewer
      algorithmChoice={localStore.transcriptionOptions.length}
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      inputText={localStore.inputText}
      isViewer={store.projects.isViewer}
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

LineViewerContainer.propTypes = {
  isLoaded: bool
}

LineViewerContainer.defaultProps = {
  isLoaded: false
}

export default observer(LineViewerContainer)
