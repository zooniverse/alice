import React from 'react'
import { CheckBox, Text } from 'grommet'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function EditorHeader ({ checked, onChange }) {
  return (
    <CheckBox
      checked={checked}
      label={<CapitalText color='#5C5C5C'>Mark As Approved</CapitalText>}
      onChange={onChange}
      reverse
      toggle
    />
  )
}


export default EditorHeader
