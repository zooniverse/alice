import React, { Component } from 'react'
import HeaderButton from './HeaderButton'
import { Save } from 'grommet-icons'

class SaveButtonContainer extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {}

  render () {
    return (
      <HeaderButton
        icon={<Save color='#555555' size='small'/>}
        label={'Save'}
        onClick={this.onClick}
      />
    )
  }
}

export default SaveButtonContainer
