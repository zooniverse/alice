import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from './components/ProjectCard'

function ProjectPageContainer () {
  const store = React.useContext(AppContext)

  if (store.auth.user && store.projects.asyncState === ASYNC_STATES.IDLE) {
    store.projects.getProjects()
  }
  const ownerProjects = store.projects.ownerProjects
  const collabProjects = store.projects.collabProjects
  const error = store.projects.error

  return (
    <Box
      background='white'
      fill='vertical'
      margin='medium'
      pad='large'
      round='xsmall'
    >
      {ownerProjects.length > 0 &&
        <Box>
          <Text>Your Projects</Text>
          <Box direction='row' gap='small' margin={{ vertical: 'small' }} wrap>
            {ownerProjects.map((project, i) =>
              <ProjectCard
              key={`Personal_Project_${i}`}
              id={project.id}
              role={project.role}
              src={project.avatar_src}
              title={project.display_name}
              />
            )}
          </Box>
        </Box>}

      {collabProjects.length > 0 &&
        <Box>
          <Text>Collaborations</Text>
          <Box direction='row' gap='small' margin={{ vertical: 'small' }} wrap>
            {collabProjects.map((project, i) =>
              <ProjectCard
                key={`Collaborative_Project_${i}`}
                id={project.id}
                role={project.role}
                src={project.avatar_src}
                title={project.display_name}
              />)}
          </Box>
        </Box>}

      {store.projects.asyncState === ASYNC_STATES.LOADING &&
        <Box justify='center' direction='row' gap='xsmall'>
          <Text>Loading</Text>
          <FontAwesomeIcon icon={faSpinner} spin />
        </Box>}

      {store.projects.asyncState === ASYNC_STATES.ERROR &&
        <Text color='red' textAlign='center'>{error}</Text>}

      {ownerProjects.length === 0 && collabProjects.length === 0 && store.projects.asyncState === ASYNC_STATES.READY &&
        <Text textAlign='center'>
          We couldn't find any transcription projects you participate in.
        </Text>}
    </Box>
  )
}

export default observer(ProjectPageContainer)
