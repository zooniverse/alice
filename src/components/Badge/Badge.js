import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormDown, FormUp } from 'grommet-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import HeaderButton from '../EditorHeader/components/HeaderButton'
import DefaultAvatar from '../../images/simple-avatar.png'

const StyledAvatar = styled.img`
  border-radius: 100%;
  height: 2.5em;
  width: auto;
  margin-left: 0.75em;
  object-fit: cover;
`

const CapitalText = styled(Text)`
  line-height: 10px;
  text-transform: uppercase;
`

function Badge ({ disabled, isOpen, name, role, setOpen, signOut, src }) {
  const Icon = isOpen ? FormDown : FormUp

  return (
    <Box align='center' direction='row' gap='xsmall'>
      <StyledAvatar alt={`${name} Avatar`} fallback={DefaultAvatar} src={src} />
      <Box>
        <Text>{name}</Text>
        <CapitalText color='dark-5' size='xsmall'>{role}</CapitalText>
      </Box>
      <DropButton
        alignSelf='center'
        disabled={disabled}
        dropAlign={{ right: 'right', top: 'bottom' }}
        label={<Box><Icon/></Box>}
        dropContent={
          <Box background='white' width='5em'>
            <HeaderButton label='Log Out' onClick={signOut} />
          </Box>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={isOpen}
        plain
      />
    </Box>
  )
}

Badge.defaultProps = {
  disabled: false,
  isOpen: false,
  name: '',
  role: '',
  setOpen: () => {},
  signOut: () => {},
  src: DefaultAvatar
}

Badge.propTypes = {
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
  setOpen: () => {},
  signOut: PropTypes.func,
  src: PropTypes.string
}

export default Badge
