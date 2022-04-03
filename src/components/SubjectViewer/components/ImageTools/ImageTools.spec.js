import { shallow } from 'enzyme'
import React from 'react'
import ImageTools from './ImageTools'

describe('Component > ImageTools', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<ImageTools />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
