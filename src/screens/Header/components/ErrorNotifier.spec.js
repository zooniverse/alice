import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'grommet'
import ErrorNotifier, { CapitalText } from './ErrorNotifier'

describe('Component > ErrorNotifier', function () {
  let wrapper

  it('should show an error', function () {
    const error = { message: 'A Message', help: 'Some Help' }
    wrapper = shallow(
      <ErrorNotifier
        error={error}
        showNotifier={true}
      />);
    const header = wrapper.find(CapitalText).first()
    const text = wrapper.find(Text).first()
    expect(header.props().children).toBe(error.message)
    expect(text.props().children).toBe(error.help)
  })

  it('should hide the notifier', function () {
    wrapper = shallow(<ErrorNotifier />);
    expect(wrapper).toEqual({})
  })
})
