import { useContext } from 'react';
import AppContext from 'store'
import { observer } from 'mobx-react'
import gsCountFromExtracts from 'helpers/gsCountFromExtracts'
import MetadataButton from './MetadataButton'

function MetadataButtonContainer() {
  const store = useContext(AppContext)
  const metadata = store.subjects.current && store.subjects.current.metadata
  const id = store.subjects.current && store.subjects.current.id
  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const transcription = store.transcriptions.current
  const extracts = store.transcriptions.rawExtracts || []
  const extractCount = extracts.length || 0
  const gsCount = gsCountFromExtracts(extracts)

  return (
    <MetadataButton
      disabled={disabled}
      goldStandardCount={gsCount}
      id={id}
      metadata={metadata}
      transcriberCount={extractCount}
      transcription={transcription}
    />
  )
}

export default observer(MetadataButtonContainer)
