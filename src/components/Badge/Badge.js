import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { FormDown } from 'grommet-icons'
import PropTypes from 'prop-types'
import DefaultAvatar from '../../images/simple-avatar.png'

const StyledAvatar = styled.img`
  border-radius: 100%;
  height: 2.5em;
  width: auto;
  margin: 0 0.5em 0 1em;
  object-fit: cover;
`

const CapitalText = styled(Text)`
  line-height: 10px;
  text-transform: uppercase;
`

function Badge ({ name, src }) {
  return (
    <Box align='center' direction='row' height='xxsmall' width='14em'>
      <StyledAvatar fallback={DefaultAvatar} src={src} />
      <Box>
        <Text>{name}</Text>
        <CapitalText color='dark-5' size='xsmall'>Project Owner</CapitalText>
      </Box>
      <FormDown />
    </Box>
  )
}

Badge.defaultProps = {
  name: '',
  src: DefaultAvatar
}

Badge.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string
}

export default Badge
