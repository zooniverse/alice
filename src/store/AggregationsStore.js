import { types } from 'mobx-state-tree'

const AggregationsStore = types.model('AggregationsStore', {
  showSettings: types.optional(types.boolean, false),
}).actions(self => ({
  toggleSettings() {
    self.showSettings = !self.showSettings
  }
}))

export { AggregationsStore }
