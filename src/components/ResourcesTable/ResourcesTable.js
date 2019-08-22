import React, { Component } from 'react'
import { Box, CheckBox, DataTable } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RoundedBox = styled(Box)`
  border-radius: 0.5em;
`

class ResourcesTable extends Component {
  state = { checked: [], columns: [] }

  onCheck = (e, value) => {
    const { checked } = this.state;
    if (e.target.checked) {
      checked.push(value);
      this.setState({ checked });
    } else {
      this.setState({ checked: checked.filter(item => item !== value) });
    }
  }

  onCheckAll = e =>
    this.setState({ checked: e.target.checked? this.props.data.map(datum => datum.id) : [] })

  render() {
    const { checked } = this.state;
    const { columns, data } = this.props;

    return (
      <RoundedBox background='white' margin={{ vertical: 'small' }} pad='medium'>
        <DataTable
          columns={[
            {
              property: "checkbox",
              render: datum => (
                <CheckBox
                  key={datum.name}
                  checked={checked.indexOf(datum.id) !== -1}
                  onChange={e => this.onCheck(e, datum.id)}
                />
              ),
              header: (
                <CheckBox
                  checked={checked.length === data.length}
                  indeterminate={
                    checked.length > 0 && checked.length < data.length
                  }
                  onChange={this.onCheckAll}
                />
              ),
            },
            ...columns
          ].map(col => ({ ...col }))}
          data={data}
        />
      </RoundedBox>
    )
  }
}

ResourcesTable.defaultProps = {
  columns: [],
  data: []
}

ResourcesTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object)
}

export default ResourcesTable
