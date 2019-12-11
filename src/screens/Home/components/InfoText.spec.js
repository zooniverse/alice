import { shallow } from 'enzyme'
import React from 'react'
import InfoText from './InfoText'

let wrapper

describe('Component > InfoText', function () {
  beforeEach(function () {
    wrapper = shallow(<InfoText />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
