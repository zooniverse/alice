import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'

let wrapper

describe('Component > Header', function () {
  beforeEach(function() {
    wrapper = shallow(<Header />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
