import { shallow } from 'enzyme'
import React from 'react'
import { SearchCheckBox } from './SearchCheckBox'

describe('Component > SearchCheckBox', function () {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<SearchCheckBox />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
