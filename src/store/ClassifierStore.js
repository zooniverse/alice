import { types } from 'mobx-state-tree'

const LAYOUT = {
  ROW: 'row',
  COLUMN: 'column'
}

const ClassifierStore = types.model('ClassifierStore', {
  layout: types.optional(types.string, LAYOUT.ROW),
}).actions(self => ({
  toggleLayout() {
    self.layout = (self.layout === LAYOUT.ROW) ? LAYOUT.COLUMN : LAYOUT.ROW
  }
}))

export { ClassifierStore }
