import writeDate from './writeDate'

describe('Helper > writeDate', function () {
  it('should return the correct date format', function () {
    const result = writeDate('Tue Jan 16 2020 19:00:00')
    expect(result).toBe('January 16, 2020')
  })

  it('should return empty string when given nothing', function () {
    const result = writeDate(null)
    expect(result).toBe('')
  })
})
