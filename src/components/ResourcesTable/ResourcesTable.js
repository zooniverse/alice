import React from 'react'
import { Box, DataTable, Text } from 'grommet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


function ResourcesTable({ columns, data, error, history, onSelection, resource, status }) {
  const onClickRow = (e) => {
    if (onSelection) {
      onSelection(e.datum)
    } else {
      const newLocation = history.location.pathname + e.datum.link
      history.push(newLocation);
    }
  }

  return (
    <Box background='white' margin={{ vertical: 'small' }} pad='medium' round='xsmall'>
      {data.length > 0 &&
        <DataTable
          columns={[...columns].map(col => ({ ...col }))}
          data={data}
          onClickRow={onClickRow}
          pad='xsmall'
          primaryKey="id"
        />
      }
      {status === ASYNC_STATES.LOADING && (
        <Box justify='center' direction='row'>
          <Text>Loading...</Text>
          <FontAwesomeIcon icon={faSpinner} spin />
        </Box>
      )}
      {status === ASYNC_STATES.ERROR && (
        <Text color='red' textAlign='center'>{error}</Text>
      )}

      {data.length === 0 && ASYNC_STATES.READY && (
        <Text textAlign='center'>Sorry, we couldn't find any {resource}</Text>
      )}
    </Box>
  )
}


ResourcesTable.defaultProps = {
  columns: [],
  data: [],
  error: '',
  onSelection: null,
  resource: null,
  status: ASYNC_STATES.IDLE
}

ResourcesTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  onSelection: PropTypes.func,
  resource: PropTypes.string,
  status: PropTypes.string
}

export default withRouter(ResourcesTable)
export { ResourcesTable }
