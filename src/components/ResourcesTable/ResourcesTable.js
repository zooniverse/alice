import React from 'react'
import { Box, DataTable } from 'grommet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


function ResourcesTable({ columns, data, history, onSelection }) {
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
      <DataTable
        columns={[...columns].map(col => ({ ...col }))}
        data={data}
        onClickRow={onClickRow}
        pad='xsmall'
        primaryKey="id"
      />
    </Box>
  )
}

ResourcesTable.defaultProps = {
  columns: [],
  data: [],
  onSelection: null,
  resource: null
}

ResourcesTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  onSelection: PropTypes.func,
  resource: PropTypes.string
}

export default withRouter(ResourcesTable)
export { ResourcesTable }
