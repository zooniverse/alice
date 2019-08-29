import React, { Component } from 'react'
import HeaderButton from './HeaderButton'
import { FormDown } from 'grommet-icons'

class MoreButtonContainer extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {}

  render () {
    return (
      <HeaderButton
        icon={<FormDown color='#555555' size='small'/>}
        label={'More'}
        onClick={this.onClick}
      />
    )
  }
}

export default MoreButtonContainer
