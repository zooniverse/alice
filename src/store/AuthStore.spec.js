import auth from 'panoptes-client/lib/auth'
import { AuthStore } from './AuthStore'
import history from '../history'

let authStore;
const user = { id: '1' }

describe('AuthStore', function () {
  it('should exist', function () {
    authStore = AuthStore.create()
    expect(authStore).toBeDefined()
  })

  describe('login function success', function () {
    beforeAll(function () {
      jest
        .spyOn(auth, 'signIn')
        .mockImplementation(() => Promise.resolve(user))
      authStore = AuthStore.create()
    })

    it('should set the user', async function () {
      let setSubmittingSpy = jest.fn()
      await authStore.login('login', 'password', setSubmittingSpy)
      expect(setSubmittingSpy).toHaveBeenCalledWith(false)
      expect(authStore.user).toBe(user)
    })
  })

  describe('login function failure', function () {
    const error = 'Failed to find user'

    beforeAll(function () {
      jest
        .spyOn(auth, 'signIn')
        .mockImplementation(() => Promise.reject({ message: error }))
      authStore = AuthStore.create()
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
      signOutSpy = jest
        .spyOn(auth, 'signOut')
        .mockImplementation(() => Promise.resolve())
      authStore = AuthStore.create({ user })
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
      authStore = AuthStore.create()
    })

    it('should set the current user', async function() {
      authStore = AuthStore.create()
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
      authStore = AuthStore.create()
      history.location.pathname = '/projects'
    })

    it('should change the route', async function () {
      await authStore.checkCurrent()
      expect(pushSpy).toHaveBeenCalledWith('/')
    })
  })
})
