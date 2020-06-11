import { types } from 'mobx-state-tree'

const LAYOUT = {
  ROW: 'row',
  COLUMN: 'column'
}

const EditorStore = types.model('EditorStore', {
  blockInteraction: types.optional(types.boolean, false),
  layout: types.optional(types.string, LAYOUT.ROW),
  linesVisible: types.optional(types.boolean, true)
}).actions(self => ({
  toggleInteraction() {
    console.log(self.blockInteraction);
    self.blockInteraction = !self.blockInteraction
  },

  toggleLineVisibility() {
    self.linesVisible = !self.linesVisible
  },

  toggleLayout() {
    self.layout = (self.layout === LAYOUT.ROW) ? LAYOUT.COLUMN : LAYOUT.ROW
  }
}))

export { EditorStore }
