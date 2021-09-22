import { useContext } from 'react';
import AppContext from 'store'
import { generatePath, matchPath, withRouter } from 'react-router-dom'
import { SUBJECTS_PATH } from 'paths'
import { observer } from 'mobx-react'
import SubjectLockedModal from './SubjectLockedModal'

function SubjectLockedModalContainer(props) {
  const store = useContext(AppContext)
  const lockedBy = store.transcriptions.current && store.transcriptions.current.locked_by
  const onBack = () => {
    store.modal.toggleModal('')
    const matchProfile = matchPath(props.history.location.pathname, { path: SUBJECTS_PATH });
    if (matchProfile) {
      const nextPath = generatePath(SUBJECTS_PATH, matchProfile.params)
      props.history.push(nextPath)
    }
  }

  return <SubjectLockedModal lockedBy={lockedBy} onBack={onBack} />
}

export { SubjectLockedModalContainer }
export default withRouter(observer(SubjectLockedModalContainer))
