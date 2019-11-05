import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Image, Text } from 'grommet'
import styled from 'styled-components'
import AppContext from 'store'
import { withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import SimplePattern from '../../../../images/simple-pattern.png'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function ProjectCard({ history, project }) {
  const imageSrc = project.avatar_src && project.avatar_src.length ? `//${project.avatar_src}` : SimplePattern
  const store = React.useContext(AppContext)
  const onClick = e => {
    history.push(`/projects/${project.id}/workflows`)
    store.projects.selectProject(project)
    store.workflows.setState(ASYNC_STATES.IDLE)
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
          <CapitalText color='light-5' textAlign='center'>{project.role}</CapitalText>
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

export default withRouter(ProjectCard)
