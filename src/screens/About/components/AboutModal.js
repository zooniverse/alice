import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function AboutModal({ caption, image, setModal }) {
  const closeModal = () => setModal(null)

  return (
    <Box background='white' elevation='small' round='xsmall'>
      <Button alignSelf='end' margin='0.2em' onClick={closeModal} plain>
        <FontAwesomeIcon icon={faTimesCircle} size='xs' />
      </Button>
      <Box height={{ max: 'large' }} width={{ max: 'large' }}>
        <Image fit='contain' src={image}/>
      </Box>
      <CapitalText margin='xsmall' size='0.6em'>{caption}</CapitalText>
    </Box>
  )
}

AboutModal.propTypes = {
  caption: string,
  image: string,
  setModal: func
}

AboutModal.defaultProps = {
  caption: '',
  image: '',
  setModal: () => {}
}
