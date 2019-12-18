import { shallow } from 'enzyme'
import React from 'react'
import SearchTag from './SearchTag'

let wrapper

describe('Component > SearchTag', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchTag />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
