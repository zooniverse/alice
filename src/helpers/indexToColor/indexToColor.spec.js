import indexToColor from './indexToColor'

describe('Helper > indexToColor', function () {
  let FINAL_CASE = 11

  it('should return a black hex code by default', function () {
    const value = indexToColor()
    expect(value).toBe('#000000')
  })

  it('should return a valid hex code up to the final case', function () {
    let cases = []
    for (let i = 0; i <= FINAL_CASE; i++) {
      cases.push(i)
    }
    cases.forEach((num) => {
      const value = indexToColor(num)
      expect(value).toBeDefined()
      expect(value.length).toBe(7)
    })
  })
})
