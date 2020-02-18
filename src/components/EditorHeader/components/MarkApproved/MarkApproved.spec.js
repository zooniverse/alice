import { shallow } from 'enzyme'
import React from 'react'
import { MarkApproved } from './MarkApproved'

let wrapper

describe('Component > MarkApproved', function () {
  beforeEach(function() {
    wrapper = shallow(<MarkApproved isAdmin />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should show Mark As Approved text', function () {
    const innerText = wrapper.props().label.props.children
    expect(innerText).toBe('Mark As Approved')
  })

  it('should show Ready For Review text', function () {
    wrapper = shallow(<MarkApproved />);
    const innerText = wrapper.props().label.props.children
    expect(innerText).toBe('Ready For Review')
  })
})
