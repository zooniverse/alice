import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import { string } from 'prop-types'

function AsyncMessages({ error, subjectState }) {
  return (
    <g>
      {subjectState === ASYNC_STATES.LOADING && (
        <text textAnchor='middle'>Loading Subject...</text>
      )}
      {subjectState === ASYNC_STATES.ERROR && (
        <text fill='red' textAnchor='middle'>{`Error: ${error}`}</text>
      )}
    </g>
  )
}

AsyncMessages.propTypes = {
  error: string,
  subjectState: string
}

AsyncMessages.defaultProps = {
  error: '',
  subjectState: ''
}

export default AsyncMessages
