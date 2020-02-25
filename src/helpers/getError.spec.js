import getError, { HELP_TEXT } from './getError'

describe('Helper > getError', function () {
  it('should return a 400 error', function () {
    const handledError = {
      body: {
        error: 'A 400 Error'
      },
      status: 400
    }
    const error = getError(handledError)
    expect(error.message).toBe('A 400 Error')
    expect(error.help).toBe(HELP_TEXT.REFRESH)
  })

  it('should return a 500 error', function () {
    const unhandledError = {
      body: {
        error: 'A 500 Error'
      },
      status: 500
    }
    const error = getError(unhandledError)
    expect(error.message).toBe('Uh oh. Something unexpected happened')
    expect(error.help).toBe(HELP_TEXT.REFRESH)
  })

  it('should return a failure to fetch', function () {
    const fetchFailureError = {
      message: 'Failed to fetch'
    }
    const error = getError(fetchFailureError)
    expect(error.message).toBe('Internet connection lost')
    expect(error.help).toBe(HELP_TEXT.RECONNECT)
  })

  it('should return an error without a code', function () {
    const error = getError()
    expect(error.message).toBe('Unknown Error')
    expect(error.help).toBe(HELP_TEXT.REFRESH)
  })
})
