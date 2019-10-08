import { shallow } from 'enzyme'
import React from 'react'
import MetadataButtonContainer from './MetadataButtonContainer'

let wrapper

describe('Component > MetadataButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<MetadataButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
