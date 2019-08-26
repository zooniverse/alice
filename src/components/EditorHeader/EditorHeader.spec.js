import { shallow } from 'enzyme'
import React from 'react'
import EditorHeader from './EditorHeader'

let wrapper

describe('Component > EditorHeader', function () {
  beforeEach(function() {
    wrapper = shallow(<EditorHeader />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
