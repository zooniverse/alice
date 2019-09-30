import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionTableContainer from './TranscriptionTableContainer'

let wrapper

describe('Component > TranscriptionTableContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<TranscriptionTableContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
