import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { generatePath, withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import { SUBJECTS_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function GroupsPageContainer({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.getResources(match.params)
  }, [match, store])

  const onSelection = group => {
    const nextPath = generatePath(SUBJECTS_PATH, { group: group.display_name, ...match.params})
    history.push(nextPath)
  }
  const onSetPage = (page) => {
    store.groups.setPage(page)
  }
  const steps = Array.from(Array(store.groups.totalPages).keys())
  const activeStep = store.groups.page
  const data = store.groups.all.length > 0 ? store.groups.all[activeStep] : []

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        activeStep={activeStep}
        columns={columns}
        data={data}
        resource='groups'
        onSelection={onSelection}
        setStep={onSetPage}
        status={ASYNC_STATES.READY}
        steps={steps}
      />
    </Box>
  )
}

export { GroupsPageContainer }
export default withRouter(observer(GroupsPageContainer))
