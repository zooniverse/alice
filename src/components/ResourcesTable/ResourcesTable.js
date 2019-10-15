import React, { Component } from 'react'
import { Box, CheckBox, DataTable, FormField } from 'grommet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ResourcesTable extends Component {
  constructor() {
    super()

    this.state = { checked: [], columns: [] }

    this.onCheck = this.onCheck.bind(this);
    this.onCheckAll = this.onCheckAll.bind(this);
    this.onClickRow = this.onClickRow.bind(this);
  }

  onCheck(e, value) {
    const { checked } = this.state;
    if (e.target.checked) {
      checked.push(value);
      this.setState({ checked });
    } else {
      this.setState({ checked: checked.filter(item => item !== value) });
    }
  }

  onCheckAll(e) {
    this.setState({ checked: e.target.checked? this.props.data.map(datum => datum.id) : [] })
  }

  onClickRow(e) {
    if (e.target.type === 'checkbox') return;

    if (this.props.onSelection) {
      this.props.onSelection(e.datum.id)
    } else {
      const newLocation = this.props.history.location.pathname + e.datum.link
      this.props.history.push(newLocation);
    }

  }

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
