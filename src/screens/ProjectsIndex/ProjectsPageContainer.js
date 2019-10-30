import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { personalProjects, collaborativeProjects } from './mockProjects'
import ProjectCard from './components/ProjectCard'

function ProjectPageContainer () {
  const store = React.useContext(AppContext)

  if (store.auth.user && store.project.asyncState === ASYNC_STATES.IDLE) {
    store.projects.getProjects()
  }
  const projects = store.projects.index

  return (
    <Box
      background='white'
      fill='vertical'
      margin='medium'
      pad='large'
      round='xsmall'
    >
      <Box>
        <Text>Your Projects</Text>
        <Box direction='row' gap='small' margin={{ vertical: 'small' }} wrap>
          {projects.map((project, i) =>
            <ProjectCard
            key={`Personal_Project_${i}`}
            id={project.id}
            src={project.avatar_src}
            title={project.display_name}
            />
          )}
        </Box>
      </Box>
      <Box>
        <Text>Collaborations</Text>
        <Box direction='row' gap='small' margin={{ vertical: 'small' }} wrap>
          {collaborativeProjects.map((project, i) =>
            <ProjectCard
              key={`Collaborative_Project_${i}`}
              id={project.id}
              src={project.src}
              title={project.title}
            />)}
        </Box>
      </Box>
    </Box>
  )
}

export default observer(ProjectPageContainer)
