import { shallow } from 'enzyme'
import React from 'react'
import InfoText from './InfoText'

describe('Component > InfoText', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<InfoText />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
