import { types } from 'mobx-state-tree'

const UserStore = types.model('UserStore', {
  user: types.optional(types.frozen({}), null),  // When uninitialised, user should be null instead of {}
})


export { UserStore }
