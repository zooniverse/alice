import { shallow } from 'enzyme'
import React from 'react'
import MarkApprovedContainer from './MarkApprovedContainer'

let wrapper

describe('Component > MarkApprovedContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<MarkApprovedContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
