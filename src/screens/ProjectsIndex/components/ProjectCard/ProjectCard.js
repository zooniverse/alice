import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Image, Text } from 'grommet'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import SimplePattern from '../../../../images/simple-pattern.png'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function ProjectCard({ history, project }) {
  const imageSrc = project.avatar_src && project.avatar_src.length ? `//${project.avatar_src}` : SimplePattern
  const onClick = e => {
    history.push(`/projects/${project.id}/workflows`)
  }

  return (
    <Box margin={{ bottom: 'small' }}>
      <Button onClick={onClick} plain>
        <Box height='small' width='12em'>
          <Image alt={`${project.display_name} Display Image`} fit='cover' src={imageSrc} />
        </Box>
        <Box border height='5em' gap='xsmall' justify='center' pad='xsmall' width='12em'>
          <CapitalText textAlign='center' weight='bold'>
            {project.display_name}
          </CapitalText>
          <CapitalText color='#57585B' textAlign='center'>{project.role}</CapitalText>
        </Box>
      </Button>
    </Box>
  )
}

ProjectCard.defaultProps = {
  history: null,
  project: {}
}

ProjectCard.propTypes = {
  history: PropTypes.shape(),
  project: PropTypes.shape({
    avatar_src: PropTypes.string,
    display_name: PropTypes.string,
    id: PropTypes.string,
    role: PropTypes.string
  })
}

export { ProjectCard }
export default withRouter(ProjectCard)
