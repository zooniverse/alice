import React, { Component } from 'react'
import { Box, CheckBox, DataTable } from 'grommet'
import mockColumns from './mockColumns'
import DATA from './mockData'

class IndexTable extends Component {
  state = { checked: [] }

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
    this.setState({ checked: e.target.checked? DATA.map(datum => datum.id) : [] })

  render() {
    const { checked } = this.state;

    return (
      <Box background='white' margin={{ vertical: 'small' }} pad='medium'>
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
                  checked={checked.length === DATA.length}
                  indeterminate={
                    checked.length > 0 && checked.length < DATA.length
                  }
                  onChange={this.onCheckAll}
                />
              ),
            },
            ...mockColumns
          ].map(col => ({ ...col }))}
          data={DATA}
        />
      </Box>
    )
  }
}


export default IndexTable
