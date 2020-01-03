import React from 'react'
import { matchPath, withRouter } from "react-router-dom";
import AppContext from 'store'
import { observer } from 'mobx-react'
import EditorHeader from './EditorHeader'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import SaveButton from './components/HeaderButton/SaveButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/MoreButton'
import { ABOUT_PATH, SUBJECTS_PATH, EDIT_PATH } from 'paths'

function routeMatcher(currentPath, route) {
  const matchProfile = matchPath(currentPath, { path: route });
  return !!(matchProfile && matchProfile.isExact)
}

function getHeaderTools(path) {
  if (routeMatcher(path, SUBJECTS_PATH)) {
    return [DownloadSetData, SearchButton]
  } else if (routeMatcher(path, EDIT_PATH)) {
    return [MarkApproved, UndoButton, SaveButton, LayoutButton, MoreButton]
  }
  return []
}

function EditorHeaderContainer({ history }) {
  const store = React.useContext(AppContext)
  const buttons = getHeaderTools(history.location.pathname)
  const showMetadata = routeMatcher(history.location.pathname, EDIT_PATH)
  const onAbout = routeMatcher(history.location.pathname, ABOUT_PATH)

  return (
    <EditorHeader
      buttons={buttons}
      onAbout={onAbout}
      showMetadata={showMetadata}
      showOverlay={store.aggregations.showModal}
      user={store.auth.user}
    />
  )
}

export { EditorHeaderContainer }
export default withRouter(observer(EditorHeaderContainer))
