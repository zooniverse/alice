import { shallow } from 'enzyme'
import React from 'react'
import SearchModal from './SearchModal'

let wrapper;

describe('Component > SearchModal', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchModal />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
