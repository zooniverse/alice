import { ClientStore } from './ClientStore'

let clientStore;

describe('ClientStore', function () {
  beforeEach(function() {
    clientStore = ClientStore.create()
    clientStore.initialize()
  })

  it('should run without crashing', function () {
    expect(clientStore).toBeDefined()
  })

  it('should initialize with the correct values', function () {
    expect(clientStore.tove.opts.headers.Accept).toBe('application/json')
    expect(clientStore.tove.opts.mode).toBe('cors')
  })

  it('should set the bearer token', function () {
    const token = 'a1b2c3d4'
    clientStore.setBearerToken(token)
    expect(clientStore.tove.opts.headers.Authorization).toBe(`Bearer ${token}`)
  })
})
