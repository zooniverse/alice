import React from 'react'
import { CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'

function SearchCheckBox({ checked, label, onChange, title }) {
  return (
    <CheckBox
      checked={checked}
      id={title}
      label={<Text size='small'>{label}</Text>}
      name={title}
      onChange={onChange}
    />
  )
}

SearchCheckBox.defaultProps = {
  label: '',
  title: ''
}

SearchCheckBox.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string
}

export default SearchCheckBox
