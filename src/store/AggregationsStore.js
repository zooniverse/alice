import { types } from 'mobx-state-tree'

const AggregationsStore = types.model('AggregationsStore', {
  showModal: types.optional(types.boolean, false),
}).actions(self => ({
  toggleModal: function() {
    self.showModal = !self.showModal
  }
}))

export { AggregationsStore }
