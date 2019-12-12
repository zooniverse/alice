import { shallow } from 'enzyme'
import React from 'react'
import AboutContent from './AboutContent'

let wrapper

describe('Component > AboutContent', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<AboutContent />);
    expect(wrapper).toBeDefined()
  })
})
