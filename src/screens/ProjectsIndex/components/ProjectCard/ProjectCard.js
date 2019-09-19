import React from 'react'
import PropTypes from 'prop-types'
import { Box, Image, Text } from 'grommet'
import styled from 'styled-components'
import SimplePattern from '../../../../images/simple-pattern.png'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function ProjectCard({ src, title }) {
  const imageSrc = src.length ? src : SimplePattern

  return (
    <Box margin={{ bottom: 'small' }}>
      <Box height='small' width='small'>
        <Image alt={`${title} Display Image`} fit='cover' src={imageSrc} />
      </Box>
      <Box border height='3.5em' justify='center' width='small'>
        <CapitalText
          margin='small'
          textAlign='center'
          weight='bold'
          wrap
        >
          {title}
        </CapitalText>
      </Box>
    </Box>
  )
}

ProjectCard.defaultProps = {
  src: '',
  title: ''
}

ProjectCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string
}
