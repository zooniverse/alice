import { shallow } from 'enzyme'
import React from 'react'
import Overlay from './Overlay'

describe('Component > Overlay', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<Overlay />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
