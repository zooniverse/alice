import { shallow } from 'enzyme'
import React from 'react'
import HeaderButton from './HeaderButton'

describe('Component > HeaderButton', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<HeaderButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
