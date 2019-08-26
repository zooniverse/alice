import React, { Component } from 'react'
import { Box, CheckBox, DataTable, FormField } from 'grommet'
import PropTypes from 'prop-types'

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
    const { columns, data, resource } = this.props;

    return (
      <Box background='white' margin={{ vertical: 'small' }} pad='medium' round='xsmall'>
        <DataTable
          columns={[
            {
              property: "checkbox",
              render: datum => (
                <FormField htmlFor={`${resource}_ID_${datum.id}`}>
                  <CheckBox
                    key={datum.name}
                    id={`${resource}_ID_${datum.id}`}
                    checked={checked.indexOf(datum.id) !== -1}
                    onChange={e => this.onCheck(e, datum.id)}
                  />
                </FormField>
              ),
              header: (
                <FormField htmlFor={`All_${resource}`}>
                  <CheckBox
                    checked={checked.length === data.length}
                    id={`All_${resource}`}
                    indeterminate={
                      checked.length > 0 && checked.length < data.length
                    }
                    onChange={this.onCheckAll}
                  />
                </FormField>
              ),
            },
            ...columns
          ].map(col => ({ ...col }))}
          data={data}
        />
      </Box>
    )
  }
}

ResourcesTable.defaultProps = {
  columns: [],
  data: [],
  resource: null
}

ResourcesTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  resource: PropTypes.string
}

export default ResourcesTable
