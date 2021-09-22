import DeletePage from 'components/Modals/DeletePageModal'
import DownloadData from 'components/Modals/DownloadDataModal'
import Loading from 'components/Modals/LoadingModal'
import SearchModal from 'components/SearchModal'
import SubjectLocked from 'components/Modals/SubjectLockedModal'
import UnapproveModal from 'components/Modals/UnapproveModal'

const modalTypes = {
  DELETE_PAGE: () => <DeletePage />,
  DOWNLOAD_GROUP: () => <DownloadData entireGroup />,
  DOWNLOAD_SUBJECT: () => <DownloadData />,
  LOADING: () => <Loading />,
  LOCKED: () => <SubjectLocked />,
  SEARCH: () => <SearchModal />,
  UNAPPROVED: () => <UnapproveModal />
}

function getModal(type) {
  return modalTypes[type] || null
}

export default getModal
