import React from 'react'
import { matchPath } from "react-router-dom";
import EditorHeader from './EditorHeader'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import SaveButton from './components/HeaderButton/SaveButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/MoreButton'
import { SUBJECTS_PATH, EDIT_PATH } from 'paths'

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

export default function EditorHeaderContainer() {
  const buttons = getHeaderTools(window.location.pathname)
  const showMetadata = routeMatcher(window.location.pathname, EDIT_PATH)

  return <EditorHeader buttons={buttons} showMetadata={showMetadata} />
}
