import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import ProjectCard from './components/ProjectCard'

function ProjectPageContainer () {
  const store = React.useContext(AppContext)

  if (store.auth.user && store.projects.asyncState === ASYNC_STATES.IDLE) {
    store.projects.getProjects()
  }
  const ownerProjects = store.projects.ownerProjects
  const collabProjects = store.projects.collabProjects

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
                src={project.avatar_src}
                title={project.display_name}
              />)}
          </Box>
        </Box>}

      {ownerProjects.length === 0 && collabProjects.length === 0 && store.projects.asyncState === ASYNC_STATES.READY &&
        <Text textAlign='center'>We couldn't find any transcription projects you participate in.</Text>}
    </Box>
  )
}

export default observer(ProjectPageContainer)
