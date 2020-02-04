import React from 'react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import MoreButton from './MoreButton'

export default function MoreButtonContainer() {
  const store = React.useContext(AppContext)
  const [isOpen, setOpen] = React.useState(false)
  const disabled = store.aggregations.showModal
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
