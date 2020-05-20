import mockJWT from './mockJWT'

describe('Helper > mockJWT', function () {
  describe('default', function () {
    it('should return a mocked object', function () {
      const result = mockJWT()
      expect(result).toHaveProperty('jwt')
    })
  })

  it('should return a merged mocked object', function () {
    const client = { get: () => {} }
    const result = mockJWT(client)
    expect(result).toHaveProperty('jwt')
  })
})
