import { types } from 'mobx-state-tree'
import UnapproveModal from 'components/Modals/UnapproveModal'
import DownloadData from 'components/Modals/DownloadDataModal'
import SubjectLocked from 'components/Modals/SubjectLockedModal'
import SearchModal from 'components/SearchModal'

const modalTypes = {
  unapproved: UnapproveModal,
  download: DownloadData,
  locked: SubjectLocked,
  search: SearchModal
}

function getModal(type) {
  return modalTypes[type] || null
}

const ModalStore = types.model('ModalStore', {
  current: types.optional(types.string, ''),
}).actions(self => ({
  toggleModal(modal) {
    self.current = modal;
  }
}))

export { getModal, ModalStore }
