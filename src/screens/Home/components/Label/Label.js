import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'grommet'

function Label ({ text }) {
  return (
      <Text size='small'>{text}</Text>
  )
}

Label.defaultProps = {
  text: ''
}

Label.propTypes = {
  text:PropTypes.string
}

export default Label
