import React from 'react'
import { CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'

function SearchCheckBox({ label }) {
  return (
    <CheckBox label={<Text size='small'>{label}</Text>}/>
  )
}

SearchCheckBox.defaultProps = {
  label: ''
}

SearchCheckBox.propTypes = {
  label: PropTypes.string
}

export default SearchCheckBox
