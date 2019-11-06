import UnapproveModal from 'components/Modals/UnapproveModal'
import DownloadData from 'components/Modals/DownloadDataModal'
import SubjectLocked from 'components/Modals/SubjectLockedModal'
import SearchModal from 'components/SearchModal'

const modalTypes = {
  UNAPPROVED: UnapproveModal,
  DOWNLOAD: DownloadData,
  LOCKED: SubjectLocked,
  SEARCH: SearchModal
}

function getModal(type) {
  return modalTypes[type] || null
}

export default getModal
