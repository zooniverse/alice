import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`
function HeaderButton ({ disabled, icon, label, margin, onClick }) {
  return (
    <Button
      disabled={disabled}
      gap='xsmall'
      icon={icon}
      label={<Box margin={margin}><CapitalText color='#5C5C5C'>{label}</CapitalText></Box>}
      onClick={onClick}
      plain
      reverse
    />
  )
}

HeaderButton.defaultProps = {
  disabled: false,
  icon: null,
  label: '',
  margin: null,
  onClick: () => {}
}

HeaderButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.shape(),
  label: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func
}

export default HeaderButton
