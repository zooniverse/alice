import indexToColor from './indexToColor'

let FINAL_CASE = 11

describe('Helper > indexToColor', function () {
  it('should return a black hex code by default', function () {
    const value = indexToColor(20)
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
