import { shallow } from 'enzyme'
import React from 'react'
import EditorHeaderContainer from './EditorHeaderContainer'

let wrapper

describe('Component > EditorHeaderContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<EditorHeaderContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
