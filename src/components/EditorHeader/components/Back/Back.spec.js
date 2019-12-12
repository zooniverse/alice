import { shallow } from 'enzyme'
import React from 'react'
import Back from './Back'

let wrapper

describe('Component > Back', function () {
  beforeEach(function() {
    wrapper = shallow(<Back />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
