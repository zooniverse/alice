import { shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import { SaveStatus } from './SaveStatus'

describe('Component > SaveStatus', function () {
  let wrapper

  it('should render without crashing', function () {
    wrapper = shallow(<SaveStatus />);
    expect(wrapper).toBeDefined()
  })

  it('should display an error', function () {
    wrapper = shallow(<SaveStatus status={ASYNC_STATES.ERROR} />);
    const icon = wrapper.props().icon
    const label = wrapper.props().label
    expect(icon.props.color).toBe('#FF0000')
    expect(label.props.children).toBe('CHANGES NOT SAVED')
  })
})
