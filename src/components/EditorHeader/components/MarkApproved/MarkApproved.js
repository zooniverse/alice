import React from 'react'
import { CheckBox, Text } from 'grommet'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-align: end;
  text-transform: uppercase;
`

function MarkApproved ({ checked, disabled, onChange }) {
  return (
    <CheckBox
      checked={checked}
      disabled={disabled}
      label={<CapitalText color='#5C5C5C'>Mark As Approved</CapitalText>}
      onChange={onChange}
      reverse
      toggle
    />
  )
}


export default MarkApproved
