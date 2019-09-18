import React, { Component } from 'react'
import MarkApproved from './MarkApproved'

class MarkApprovedContainer extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.state = {
      checked: false
    }
  }

  onChange() {
    this.setState({ checked: !this.state.checked })
  }

  render () {
    return <MarkApproved checked={this.state.checked} onChange={this.onChange} />
  }
}

export default MarkApprovedContainer
