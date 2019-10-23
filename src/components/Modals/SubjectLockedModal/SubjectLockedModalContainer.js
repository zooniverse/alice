import React from 'react'
import AppContext from 'store'
import { generatePath, matchPath, withRouter } from 'react-router-dom'
import { SUBJECTS_PATH } from 'paths'
import SubjectLockedModal from './SubjectLockedModal'

function SubjectLockedModalContainer(props) {
  const store = React.useContext(AppContext)
  const onBack = () => {
    store.modal.toggleModal('')
    const matchProfile = matchPath(props.history.location.pathname, { path: SUBJECTS_PATH });
    const nextPath = generatePath(SUBJECTS_PATH, matchProfile.params)
    props.history.replace(nextPath)
  }

  return <SubjectLockedModal onBack={onBack} />
}

export default withRouter(SubjectLockedModalContainer)
