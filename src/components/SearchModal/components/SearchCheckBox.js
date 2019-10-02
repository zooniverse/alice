import React from 'react'
import { CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'

function SearchCheckBox({ checked, disabled, label, onChange, title }) {
  return (
    <CheckBox
      checked={checked}
      disabled={disabled}
      id={title}
      label={<Text size='small'>{label}</Text>}
      name={title}
      onChange={onChange}
    />
  )
}

SearchCheckBox.defaultProps = {
  checked: false,
  disabled: false,
  label: '',
  onChange: () => {},
  title: ''
}

SearchCheckBox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string
}

export default SearchCheckBox
