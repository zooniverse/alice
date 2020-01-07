import { types, flow } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import history from '../history'

const AuthStore = types.model('AuthStore', {
  user: types.optional(types.frozen({}), null),
  error: types.optional(types.string, '')
}).actions(self => ({
  checkCurrent: flow(function* checkCurrent () {
    try {
      const user = yield auth.checkCurrent()
      if (user) {
        self.user = user
      } else if (history.location.pathname !== '/') {
        history.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }),

  login: flow(function* login (login, password, setSubmitting) {
    try {
      const user = yield auth.signIn({ login, password })
      if (user) { self.user = user }
      setSubmitting(false)
      history.push('/projects')
    } catch (error) {
      self.error = error.message
      setSubmitting(false)
    }
  }),

  logout: flow(function* logout () {
    try {
      yield auth.signOut()
    } catch (error) {
      console.warn(error);
    }
    self.user = null
    history.push('/')
  })
}))

export { AuthStore }
