import { types } from 'mobx-state-tree'

const AggregationsStore = types.model('AggregationsStore', {
  showModal: types.optional(types.boolean, false),
  showTranscription: types.optional(types.boolean, false),
}).actions(self => ({
  setModal: function(state) {
    self.showModal = state
  },

  toggleModal: function() {
    self.showModal = !self.showModal
  },

  toggleTranscription: function() {
    self.showTranscription = !self.showTranscription
  }
}))

export { AggregationsStore }
