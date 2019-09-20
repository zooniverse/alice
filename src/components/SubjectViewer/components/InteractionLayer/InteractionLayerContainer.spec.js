import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

let wrapper

describe('Component > InteractionLayerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<InteractionLayerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
