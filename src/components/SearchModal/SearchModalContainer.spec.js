import { shallow } from 'enzyme'
import React from 'react'
import SearchModalContainer from './SearchModalContainer'

let wrapper;

describe('Component > SearchModalContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchModalContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
