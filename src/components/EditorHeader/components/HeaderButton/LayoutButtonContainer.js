import React, { Component } from 'react'
import HeaderButton from './HeaderButton'
import { Box } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'

class LayoutButtonContainer extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {}

  render () {
    return (
      <HeaderButton
        icon={
          <Box direction='row' gap='xxsmall'>
            <FontAwesomeIcon color='#555555' icon={faPause} size='xs' />
            <FontAwesomeIcon color='#555555' icon={faPause} rotation={90} size='xs' />
          </Box>
        }
        label={'Layout'}
        onClick={this.onClick}
      />
    )
  }
}

export default LayoutButtonContainer
