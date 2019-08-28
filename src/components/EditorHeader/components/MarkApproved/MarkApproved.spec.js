import { shallow } from 'enzyme'
import React from 'react'
import MarkApproved from './MarkApproved'

let wrapper

describe('Component > MarkApproved', function () {
  beforeEach(function() {
    wrapper = shallow(<MarkApproved />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
