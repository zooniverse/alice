import React from 'react'
import EditorHeader from './EditorHeader'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import SaveButton from './components/HeaderButton/SaveButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/HeaderButton/MoreButtonContainer'
import { SUBJECTS_PATH, EDIT_PATH } from 'paths'

function getHeaderTools(path) {
  switch (path) {
    case SUBJECTS_PATH:
      return [DownloadSetData, SearchButton]
    case EDIT_PATH:
      return [MarkApproved, UndoButton, SaveButton, LayoutButton, MoreButton]
    default:
      return []
  }
}

export default function EditorHeaderContainer() {
  const buttons = getHeaderTools(window.location.pathname)
  return <EditorHeader buttons={buttons} />
}
