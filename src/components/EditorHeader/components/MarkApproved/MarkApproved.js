import React from 'react'
import { CheckBox, Text } from 'grommet'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import withThemeContext from 'helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled(Text)`
  text-align: end;
  text-transform: uppercase;
`

function MarkApproved ({ checked, disabled, isAdmin, onChange }) {
  const innerText = isAdmin ? 'Mark As Approved' : 'Ready For Review'

  return (
    <CheckBox
      checked={checked}
      disabled={disabled}
      label={<CapitalText color='#5C5C5C'>{innerText}</CapitalText>}
      onChange={onChange}
      reverse
      toggle
    />
  )
}

MarkApproved.propTypes = {
  checked: bool,
  disabled: bool,
  isAdmin: bool,
  onChange: func
}

MarkApproved.defaultProps = {
  checked: false,
  disabled: false,
  isAdmin: false,
  onChange: () => {}
}

export { MarkApproved }
export default withThemeContext(MarkApproved, theme)
