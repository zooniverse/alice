import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'

describe('Component > Header', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<Header />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
