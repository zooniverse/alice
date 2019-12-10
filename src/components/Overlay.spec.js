import { shallow } from 'enzyme'
import React from 'react'
import Overlay from './Overlay'

let wrapper

describe('Component > Overlay', function () {
  beforeEach(function() {
    wrapper = shallow(<Overlay />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
