import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { generatePath, withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import { SUBJECTS_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectSetPageContainer({ history, match }) {
  const store = React.useContext(AppContext)
  const onSelection = group => {
    store.groups.selectGroup(group)
    const nextPath = generatePath(SUBJECTS_PATH, { subjectSet: group.id, ...match.params})
    history.push(nextPath)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={columns}
        data={store.groups.all}
        resource='Subject Sets'
        onSelection={onSelection}
        status={ASYNC_STATES.READY}
      />
    </Box>
  )
}

export { SubjectSetPageContainer }
export default withRouter(observer(SubjectSetPageContainer))
