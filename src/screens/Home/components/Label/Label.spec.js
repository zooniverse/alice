import { shallow } from 'enzyme'
import React from 'react'
import Label from './Label'

describe('Component > Label', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<Label />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
