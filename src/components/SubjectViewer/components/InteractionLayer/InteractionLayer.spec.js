import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayer from './InteractionLayer'

let wrapper

describe('Component > InteractionLayer', function () {
  beforeEach(function() {
    wrapper = shallow(<InteractionLayer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
