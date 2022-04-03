import auth from 'panoptes-client/lib/auth'
import { AppStore } from './AppStore'
import history from '../history'

describe('AuthStore', function () {
  const user = { id: '1', display_name: 'A_USER' }

  let authStore
  const setBearerTokenSpy = jest.fn()

  let rootStore = AppStore.create()
  Object.defineProperty(
    rootStore.client, 'setBearerToken',
    { writable: true, value: setBearerTokenSpy })

  it('should exist', function () {
    authStore = rootStore.auth
    expect(authStore).toBeDefined()
  })

  describe('login function success', function () {
    beforeAll(function () {
      jest
        .spyOn(auth, 'checkBearerToken')
        .mockImplementation(() => Promise.resolve())
      jest
        .spyOn(auth, 'signIn')
        .mockImplementation(() => Promise.resolve(user))
      authStore = rootStore.auth
    })

    it('should set the user', async function () {
      let setSubmittingSpy = jest.fn()
      await authStore.login('login', 'password', setSubmittingSpy)
      expect(setSubmittingSpy).toHaveBeenCalledWith(false)
      expect(authStore.user).toBe(user)
      expect(authStore.userName).toBe(user.display_name)
    })
  })

  describe('login function failure', function () {
    const error = 'Failed to find user'

    beforeAll(function () {
      jest
        .spyOn(auth, 'signIn')
        .mockImplementation(() => Promise.reject({ message: error }))
      authStore = rootStore.auth
    })

    it('should set the user', async function () {
      let setSubmittingSpy = jest.fn()
      await authStore.login('login', 'password', setSubmittingSpy)
      expect(setSubmittingSpy).toHaveBeenCalledWith(false)
      expect(authStore.error).toBe(error)
    })
  })

  describe('logout function success', function () {
    let signOutSpy
    const user = { id: '1' }

    beforeAll(function () {
      signOutSpy = jest.spyOn(auth, 'signOut').mockImplementation(() => Promise.resolve())
      rootStore = AppStore.create({ auth: { user } })
      Object.defineProperty(
        rootStore.client, 'setBearerToken',
        { writable: true, value: setBearerTokenSpy })
      authStore = rootStore.auth
    })

    it('should call the sign out function', async function () {
      await authStore.logout()
      expect(authStore.user).toBe(null)
      expect(signOutSpy).toHaveBeenCalled()
    })
  })

  describe('checkCurrent returns user', function () {
    beforeAll(function () {
      jest
        .spyOn(auth, 'checkCurrent')
        .mockImplementation(() => Promise.resolve(user))
      authStore = rootStore.auth
    })

    it('should set the current user', async function() {
      authStore = rootStore.auth
      await authStore.checkCurrent()
      expect(authStore.user).toBe(user)
    })
  })

  describe('checkCurrent returns nothing', function () {
    let pushSpy
    beforeAll(function () {
      pushSpy = jest
        .spyOn(history, 'push')
        .mockImplementation(() => {})
      jest
        .spyOn(auth, 'checkCurrent')
        .mockImplementation(() => Promise.resolve())
      authStore = rootStore.auth
      history.location.pathname = '/projects'
    })

    it('should change the route', async function () {
      await authStore.checkCurrent()
      expect(pushSpy).toHaveBeenCalledWith('/')
    })
  })
})
