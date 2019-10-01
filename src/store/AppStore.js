import { types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'

const AppStore = types.model('AppStore', {
  initialised: types.optional(types.boolean, false),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
})

export { AppStore }
