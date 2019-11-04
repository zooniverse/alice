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

export default function ProjectCard({ id, role, src, title }) {
  const imageSrc = src.length ? `//${src}` : SimplePattern

  return (
    <Box margin={{ bottom: 'small' }}>
      <StyledLink to={`/projects/${id}/workflows`}>
        <Box height='small' width='12em'>
          <Image alt={`${title} Display Image`} fit='cover' src={imageSrc} />
        </Box>
        <Box border height='5em' gap='xsmall' justify='center' pad='xsmall' width='12em'>
          <CapitalText textAlign='center' weight='bold'>
            {title}
          </CapitalText>
          <CapitalText color='light-5' textAlign='center'>{role}</CapitalText>
        </Box>
      </StyledLink>
    </Box>
  )
}

ProjectCard.defaultProps = {
  id: '',
  role: 'Viewer',
  src: '',
  title: ''
}

ProjectCard.propTypes = {
  id: PropTypes.string,
  role: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string
}
