import { types } from 'mobx-state-tree'

const AuthStore = types.model('AuthStore', {
  user: types.optional(types.frozen({}), null),
}).actions(self => ({
  login () {
    console.log("hello world");
  },
}))


export { AuthStore }
