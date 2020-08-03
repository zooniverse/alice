import { types } from 'mobx-state-tree'

export const TranscriptionError = types.model('Error', {
  message: types.string,
  help: types.optional(types.string, ''),
})

export const HELP_TEXT = {
  RECONNECT: 'Your changes have been saved but will not be synced until reconnection',
  REFRESH: 'Please refresh the page to begin from your most recent save state'
}

const ERROR_TYPES = {
  HANDLED: 'HANDLED',
  UNHANDLED: 'UNHANDLED',
  CONNECTION: 'CONNECTION'
}

export default function getError(err = {}) {
  const code = err.status
  let type, message

  if (code) {
    type = code.toString().charAt(0) === '4' ? ERROR_TYPES.HANDLED : ERROR_TYPES.UNHANDLED
    message = (err.body && err.body.error) || 'There was an error!'
  } else {
    type = err.message && err.message.indexOf('Failed to fetch') >= 0 ? ERROR_TYPES.CONNECTION : ERROR_TYPES.HANDLED
    message = err.message || 'Unknown Error'
  }

  switch (type) {
    case ERROR_TYPES.HANDLED:
      return TranscriptionError.create({ message: message, help: HELP_TEXT.REFRESH })
    case ERROR_TYPES.UNHANDLED:
      return TranscriptionError.create({
        message: 'Uh oh. Something unexpected happened',
        help: HELP_TEXT.REFRESH
      })
    default:
      return TranscriptionError.create({
        message: 'Internet connection lost',
        help: HELP_TEXT.RECONNECT
      })
  }
}
