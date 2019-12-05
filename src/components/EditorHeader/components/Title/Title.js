import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Heading, Text } from 'grommet'
import AppContext from 'store'
import { generatePath, matchPath, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { bool } from 'prop-types'
import {
  SUBJECTS_PATH,
  GROUPS_PATH,
  WORKFLOWS_PATH
} from 'paths'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function Title({ history, match, onEditor }) {
  const routeTo = (path) => {
    const matchProfile = matchPath(history.location.pathname, { path });
    const nextPath = generatePath(path, matchProfile.params)
    history.push(nextPath)
  }

  const store = React.useContext(AppContext)
  const project = store.projects.title
  const workflow = store.workflows.title
  const group = store.groups.title
  const subject = store.subjects.title
  let titles = [
    { title: subject },
    { title: group, path: SUBJECTS_PATH, to: 'Subjects Index Page' },
    { title: workflow, path: GROUPS_PATH, to: 'Groups Index Page' },
    { title: project, path: WORKFLOWS_PATH, to: 'Workflows Index Page' }
  ]

  const headerIndex = titles.findIndex(header => header.title.length > 0)
  let header = titles[headerIndex]
  titles.splice(headerIndex, 1)

  if (onEditor) {
    titles = [{ title: group, path: SUBJECTS_PATH, to: 'Subjects Index Page' }]
    header = { title: subject }
  }
  const subjectCount = header.title === group ?
    `(${store.transcriptions.approvedCount}/${store.transcriptions.all.size} approved)` : ''

  return (
    <Box align='baseline' direction='row' gap='0.25em'>
      {titles.reverse().map((sub, i) =>
        sub.title.length > 0 && (
          <Button
            key={`SUB_HEADER_${i}`}
            a11yTitle={sub.to}
            disabled={store.aggregations.showModal}
            label={<CapitalText key={`SUB_HEADER_${i}`}>{`${sub.title} /`}</CapitalText>}
            onClick={() => routeTo(sub.path)}
            plain
          />
        ))}
      <Heading>{header.title}</Heading>
      {subjectCount.length > 0 && <CapitalText>{subjectCount}</CapitalText>}
    </Box>
  )
}

Title.propTypes = {
  onEditor: bool
}

Title.defaultProps = {
  onEditer: false
}

export { CapitalText, Title }
export default withRouter(observer(Title))
