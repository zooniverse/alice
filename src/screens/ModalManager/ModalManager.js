import React from 'react'
import { observer } from 'mobx-react'
import { Box, Layer } from 'grommet'
import AppContext from 'store'
import getModal from 'helpers/getModal'

function ModalManager() {
  const store = React.useContext(AppContext)
  const modal = store.modal && store.modal.current
  const CurrentModal = getModal(modal)

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
