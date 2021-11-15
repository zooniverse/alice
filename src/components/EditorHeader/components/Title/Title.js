import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Heading, Text } from 'grommet'
import AppContext from 'store'
import { generatePath, matchPath, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { bool } from 'prop-types'
import {
  GROUPS_PATH,
  PROJECTS_PATH,
  SUBJECTS_PATH,
  WORKFLOWS_PATH
} from 'paths'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledHeading = styled(Heading)`
  font-weight: 300;
`

function Title({ history, match, onEditor }) {
  const routeTo = (path) => {
    const matchProfile = matchPath(history.location.pathname, { path });
    const nextPath = generatePath(path, matchProfile.params)
    history.push(nextPath)
  }

  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const project = store.projects.title || ''
  const workflow = store.workflows.title || ''
  const group = store.groups.title || ''
  const subject = store.transcriptions.title || ''
  let titles = [
    { title: subject },
    { title: group, path: SUBJECTS_PATH, to: 'Subjects Index Page' },
    { title: workflow, path: GROUPS_PATH, to: 'Groups Index Page' },
    { title: project, path: WORKFLOWS_PATH, to: 'Workflows Index Page' },
    { title: 'Projects', path: PROJECTS_PATH, to: 'Projects Index Page' }
  ]

  if (project === 'Select Project' || onEditor) titles.pop()

  const headerIndex = titles.findIndex(header => header.title.length > 0)
  let header = titles[headerIndex]
  titles.splice(headerIndex, 1)

  if (onEditor) {
    titles = [{ title: group, path: SUBJECTS_PATH, to: 'Subjects Index Page' }]
    header = { title: subject }
  }
  const subjectCount = header.title === group ?
    `(${store.transcriptions.approvedCount}/${store.transcriptions.totalCount} approved)` : ''
  return (
    <Box align='baseline'>
      <Box direction='row' wrap>
        {titles.reverse().map((sub, i) => {
          const nextSub = titles[i+1]
          const removeSlash = i === titles.length - 1 || nextSub.title.length === 0
          return (
            sub.title.length > 0 && (
              <Button
                key={`SUB_HEADER_${i}`}
                a11yTitle={sub.to}
                disabled={disabled}
                label={<CapitalText key={`SUB_HEADER_${i}`} color='#5C5C5C'>{`${sub.title} ${removeSlash ? '' : '/'}`}</CapitalText>}
                onClick={() => routeTo(sub.path)}
                plain
              />
          )
        )})}
      </Box>
      <Box align='baseline' direction='row' gap='0.5em'>
        <StyledHeading margin='0em'>{header.title}</StyledHeading>
        {subjectCount.length > 0 && <CapitalText color='#5C5C5C'>{subjectCount}</CapitalText>}
      </Box>
    </Box>
  )
}

Title.propTypes = {
  onEditor: bool
}

Title.defaultProps = {
  onEditer: false
}

export { CapitalText, StyledHeading, Title }
export default withRouter(observer(Title))
