import { types } from 'mobx-state-tree'
import { UserStore } from './UserStore'

const AppStore = types.model('AppStore', {
  initialised: types.optional(types.boolean, false),
  user: types.optional(UserStore, () => UserStore.create({})),
})

export { AppStore }
