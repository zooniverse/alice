import React, { Component } from 'react'
import HeaderButton from './HeaderButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

class SaveButtonContainer extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {}

  render () {
    return (
      <HeaderButton
        icon={<FontAwesomeIcon color='#555555' icon={faSave} size='xs' />}
        label={'Save'}
        onClick={this.onClick}
      />
    )
  }
}

export default SaveButtonContainer
