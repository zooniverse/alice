import { shallow } from 'enzyme'
import React from 'react'
import MetadataButton from './MetadataButton'

let wrapper

describe('Component > MetadataButton', function () {
  beforeEach(function() {
    wrapper = shallow(<MetadataButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
