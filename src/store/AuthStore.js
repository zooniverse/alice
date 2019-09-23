import { types } from 'mobx-state-tree'
import { auth } from 'panoptes-client'

const AuthStore = types.model('AuthStore', {
  user: types.optional(types.frozen({}), null),
}).actions(self => ({
  login () {
    console.log(auth);
  },
}))


export { AuthStore }
