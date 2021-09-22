import { useContext } from 'react';
import { observer } from 'mobx-react'
import { Box, Layer } from 'grommet'
import AppContext from 'store'
import getModal from 'helpers/getModal'

function ModalManager() {
  const store = useContext(AppContext)
  const modal = store.modal && store.modal.current
  const CurrentModal = getModal(modal)

  return (
    <Box>
      {CurrentModal && (
        <Layer animate={false}>
          <CurrentModal />
        </Layer>
      )}
    </Box>
  )
}

export default observer(ModalManager)
