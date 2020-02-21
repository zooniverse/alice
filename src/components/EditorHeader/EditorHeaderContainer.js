import React from 'react'
import { matchPath, withRouter } from "react-router-dom";
import AppContext from 'store'
import { observer } from 'mobx-react'
import EditorHeader from './EditorHeader'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import SaveStatus from './components/SaveStatus'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/MoreButton'
import { ABOUT_PATH, SUBJECTS_PATH, EDIT_PATH } from 'paths'

function routeMatcher(currentPath, route) {
  const matchProfile = matchPath(currentPath, { path: route });
  return !!(matchProfile && matchProfile.isExact)
}

function getHeaderTools(path, isViewer = false) {
  if (routeMatcher(path, SUBJECTS_PATH)) {
    const buttons = [DownloadSetData, SearchButton]
    if (isViewer) buttons.shift()
    return buttons
  } else if (routeMatcher(path, EDIT_PATH)) {
    let buttons = [SaveStatus, MarkApproved, UndoButton, LayoutButton, MoreButton]
    if (isViewer) buttons = [LayoutButton]
    return buttons
  }
  return []
}

function EditorHeaderContainer({ history }) {
  const store = React.useContext(AppContext)
  const buttons = getHeaderTools(history.location.pathname, store.projects.isViewer)
  const disabled = store.aggregations.showModal || store.transcriptions.approved
  const onAbout = routeMatcher(history.location.pathname, ABOUT_PATH)
  const showMetadata = routeMatcher(history.location.pathname, EDIT_PATH)

  return (
    <EditorHeader
      buttons={buttons}
      disabled={disabled}
      onAbout={onAbout}
      showMetadata={showMetadata}
      user={store.auth.user}
    />
  )
}

export { EditorHeaderContainer }
export default withRouter(observer(EditorHeaderContainer))
