import { useContext, useState } from 'react';
import AppContext from 'store'
import MODALS from 'helpers/modals'
import MoreButton from './MoreButton'

export default function MoreButtonContainer() {
  const store = useContext(AppContext)
  const [isOpen, setOpen] = useState(false)
  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const disableEditingAggregations = store.transcriptions.approved
  const toggleDownload = () => store.modal.toggleModal(MODALS.DOWNLOAD_SUBJECT)

  return (
    <MoreButton
      disabled={disabled}
      disableEditingAggregations={disableEditingAggregations}
      isOpen={isOpen}
      setOpen={setOpen}
      toggleDownload={toggleDownload}
    />
  )
}
