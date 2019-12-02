import React from 'react'
import { Box, Menu, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DefaultAvatar from '../../images/simple-avatar.png'

const StyledAvatar = styled.img`
  border-radius: 100%;
  height: 2.5em;
  width: auto;
  margin: 0 0.75em;
  object-fit: cover;
`

const CapitalText = styled(Text)`
  line-height: 10px;
  text-transform: uppercase;
`

function Badge ({ disabled, name, role, signOut, src }) {
  return (
    <Box align='center' direction='row'>
      <StyledAvatar alt={`${name} Avatar`} fallback={DefaultAvatar} src={src} />
      <Box>
        <Text>{name}</Text>
        <CapitalText color='dark-5' size='xsmall'>{role}</CapitalText>
      </Box>
      <Menu
        disabled={disabled}
        dropAlign={{ right: 'right', top: 'bottom' }}
        items={[{ label: 'Log Out', onClick: signOut }]}
      />
    </Box>
  )
}

Badge.defaultProps = {
  disabled: false,
  name: '',
  role: '',
  signOut: () => {},
  src: DefaultAvatar
}

Badge.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
  signOut: PropTypes.func,
  src: PropTypes.string
}

export default Badge
