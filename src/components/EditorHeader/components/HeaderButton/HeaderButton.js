import React from 'react'
import { Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`
function HeaderButton ({ icon, label, onClick }) {
  return (
    <Button
      gap='xsmall'
      icon={icon}
      label={<CapitalText color='#5C5C5C'>{label}</CapitalText>}
      onClick={onClick}
      plain
      reverse
    />
  )
}

HeaderButton.defaultProps = {
  icon: null,
  label: '',
  onClick: () => {}
}

HeaderButton.propTypes = {
  icon: PropTypes.shape(),
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default HeaderButton
