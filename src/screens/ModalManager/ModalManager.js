import React from 'react'
import { observer } from 'mobx-react'
import { Box, Layer } from 'grommet'
import AppContext from 'store'
import UnapproveModal from 'components/Modals/UnapproveModal'
import { getModal } from 'store/ModalStore'

function ModalManager() {
  const store = React.useContext(AppContext)
  const CurrentModal = getModal(store.modal.current)

  return (
    <Box>
      {CurrentModal && (
        <Layer>
          <CurrentModal />
        </Layer>
      )}
    </Box>
  )
}

export default observer(ModalManager)
