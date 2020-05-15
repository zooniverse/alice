import isEqual from './isEqual'

describe('Helper > isEqual', function () {
  describe('when passed arrays', function () {
    it('should check if equal', function () {
      expect(isEqual(['foo', 'bar'], ['foo', 'bar'])).toBe(true)
    })

    it('should check if unequal', function () {
      expect(isEqual(['foo', 'bar'], ['bar', 'foo'])).toBe(false)
    })

    describe('when of unequal lengths', function () {
      it('should return false', function () {
        expect(isEqual(['foo', 'bar'], ['foo'])).toBe(false)
      })
    })
  })

  describe('when passed other variables', function () {
    it('should check if equal', function () {
      expect(isEqual('foo', 'foo')).toBe(true)
    })

    it('should check if unequal', function () {
      expect(isEqual('foo', 'bar')).toBe(false)
    })
  })
})
