import React, { Component } from 'react'
import { Box, DataTable } from 'grommet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ResourcesTable extends Component {
  constructor() {
    super()

    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow(e) {
    if (this.props.onSelection) {
      this.props.onSelection(e.datum)
    } else {
      const newLocation = this.props.history.location.pathname + e.datum.link
      this.props.history.push(newLocation);
    }
  }

  render() {
    const { columns, data } = this.props;

    return (
      <Box background='white' margin={{ vertical: 'small' }} pad='medium' round='xsmall'>
        <DataTable
          columns={[...columns].map(col => ({ ...col }))}
          data={data}
          onClickRow={this.onClickRow}
          pad='xsmall'
          primaryKey="id"
        />
      </Box>
    )
  }
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
