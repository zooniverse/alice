import React from 'react'
import UnapproveModal from 'components/Modals/UnapproveModal'
import DownloadData from 'components/Modals/DownloadDataModal'
import Loading from 'components/Modals/LoadingModal'
import SubjectLocked from 'components/Modals/SubjectLockedModal'
import SearchModal from 'components/SearchModal'

const modalTypes = {
  UNAPPROVED: () => <UnapproveModal />,
  DOWNLOAD_SUBJECT: () => <DownloadData />,
  DOWNLOAD_GROUP: () => <DownloadData entireGroup />,
  LOADING: () => <Loading />,
  LOCKED: () => <SubjectLocked />,
  SEARCH: () => <SearchModal />
}

function getModal(type) {
  return modalTypes[type] || null
}

export default getModal
