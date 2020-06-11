import { types } from 'mobx-state-tree'

const LAYOUT = {
  ROW: 'row',
  COLUMN: 'column'
}

const EditorStore = types.model('EditorStore', {
  layout: types.optional(types.string, LAYOUT.ROW),
  linesVisible: types.optional(types.boolean, true)
}).actions(self => ({
  toggleLineVisibility() {
    self.linesVisible = !self.linesVisible
  },

  toggleLayout() {
    self.layout = (self.layout === LAYOUT.ROW) ? LAYOUT.COLUMN : LAYOUT.ROW
  }
}))

export { EditorStore }
