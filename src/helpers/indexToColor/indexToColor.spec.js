import indexToColor from './indexToColor'

describe('Helper > indexToColor', function () {
  it('should return a black hex code by default', function () {
    const value = indexToColor(20)
    expect(value).toBe('#000000')
  })

  it('should the correct color for a first index value', function () {
    const value = indexToColor(0);
    expect(value).toBe('#FFFF00')
  })
})
