import { shallow } from 'enzyme'
import React from 'react'
import Editor from './Editor'

let wrapper

describe('Component > Editor', function () {
  beforeEach(function() {
    wrapper = shallow(<Editor />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
