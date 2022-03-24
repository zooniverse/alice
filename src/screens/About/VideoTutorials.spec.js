import { shallow } from 'enzyme'
import React from 'react'
import VideoTutorials from './VideoTutorials'

describe('Component > VideoTutorials', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VideoTutorials />);
    expect(wrapper).toBeDefined()
  })
})
