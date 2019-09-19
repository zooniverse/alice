import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import { personalProjects, collaborativeProjects } from './mockProjects'
import ProjectCard from './components/ProjectCard'

export default class ProjectPageContainer extends Component {
  constructor() {
    super()

    this.state = {
      collaborativeProjects,
      personalProjects
    }
  }

  render() {
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
            {personalProjects.map((project, i) =>
              <ProjectCard
                key={`Personal_Project_${i}`}
                src={project.src}
                title={project.title}
              />)}
          </Box>
        </Box>
        <Box>
          <Text>Collaborations</Text>
          <Box direction='row' gap='small' margin={{ vertical: 'small' }} wrap>
            {collaborativeProjects.map((project, i) =>
              <ProjectCard
                key={`Collaborative_Project_${i}`}
                src={project.src}
                title={project.title}
              />)}
          </Box>
        </Box>
      </Box>
    )
  }
}
