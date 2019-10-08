import React from 'react'
import PropTypes from 'prop-types'
import { Box, Image, Text } from 'grommet'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SimplePattern from '../../../../images/simple-pattern.png'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export default function ProjectCard({ id, src, title }) {
  const imageSrc = src.length ? src : SimplePattern

  return (
    <Box margin={{ bottom: 'small' }}>
      <StyledLink to={`/projects/${id}/workflows`}>
        <Box height='small' width='small'>
          <Image alt={`${title} Display Image`} fit='cover' src={imageSrc} />
        </Box>
        <Box border height='3.5em' justify='center' width='small'>
          <CapitalText
            margin='small'
            textAlign='center'
            weight='bold'
          >
            {title}
          </CapitalText>
        </Box>
      </StyledLink>
    </Box>
  )
}

ProjectCard.defaultProps = {
  id: '',
  src: '',
  title: ''
}

ProjectCard.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string
}
