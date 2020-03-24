import { flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import history from '../history'

const AuthStore = types.model('AuthStore', {
  user: types.optional(types.frozen({}), null),
  error: types.optional(types.string, '')
}).actions(self => ({
  checkCurrent: flow(function* checkCurrent () {
    const allAccessPaths = ['/', '/about']
    try {
      const user = yield auth.checkCurrent()
      if (user) {
        self.user = user
        yield auth.checkBearerToken().then(token => getRoot(self).client.setBearerToken(token));
      } else if (!allAccessPaths.includes(history.location.pathname)) {
        history.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }),

  login: flow(function* login (login, password, setSubmitting) {
    try {
      const user = yield auth.signIn({ login, password })
      yield auth.checkBearerToken().then(token => getRoot(self).client.setBearerToken(token));
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
    getRoot(self).client.setBearerToken(null)
    self.user = null
    history.push('/')
  })
})).views(self => ({
  get userName () {
    return self.user && self.user.display_name
  }
}))

export { AuthStore }
