import { shallow } from 'enzyme'
import React from 'react'
import SearchButtonContainer from './SearchButtonContainer'

let wrapper

describe('Component > SearchButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
