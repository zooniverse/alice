import { types } from 'mobx-state-tree'

const LAYOUT = {
  ROW: 'row',
  COLUMN: 'column'
}

const EditorStore = types.model('EditorStore', {
  layout: types.optional(types.string, LAYOUT.ROW),
}).actions(self => ({
  toggleLayout() {
    self.layout = (self.layout === LAYOUT.ROW) ? LAYOUT.COLUMN : LAYOUT.ROW
  },

  updateViewerSize(width, height) {
    console.log(width, height);
  }
}))

export { EditorStore }
