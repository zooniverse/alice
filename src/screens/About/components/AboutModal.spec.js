import { shallow } from 'enzyme'
import React from 'react'
import AboutModal from './AboutModal'

let wrapper

describe('Component > AboutModal', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<AboutModal />);
    expect(wrapper).toBeDefined()
  })
})
