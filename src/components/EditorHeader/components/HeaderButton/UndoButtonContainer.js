import React, { Component } from 'react'
import HeaderButton from './HeaderButton'
import { Refresh } from 'grommet-icons'

class UndoButtonContainer extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {}

  render () {
    return (
      <HeaderButton
        icon={<Refresh color='#555555' size='small'/>}
        label={'Undo'}
        onClick={this.onClick}
      />
    )
  }
}

export default UndoButtonContainer
