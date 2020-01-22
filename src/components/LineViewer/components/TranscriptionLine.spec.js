import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionLine from './TranscriptionLine'

let wrapper

describe('Component > TranscriptionLine', function () {
  beforeEach(function() {
    wrapper = shallow(<TranscriptionLine />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
