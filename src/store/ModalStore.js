import { types } from 'mobx-state-tree'

const ModalStore = types.model('ModalStore', {
  current: types.optional(types.string, ''),
}).actions(self => ({
  toggleModal(modal) {
    self.current = modal;
  }
}))

export { ModalStore }
