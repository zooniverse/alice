import { shallow } from 'enzyme'
import React from 'react'
import PhotoBlock from './PhotoBlock'

describe('Component > PhotoBlock', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<PhotoBlock />);
    expect(wrapper).toBeDefined()
  })
})
