import { shallow } from 'enzyme'
import React from 'react'
import Loading from './Loading'

describe('Component > Loading', function () {
  let wrapper

  it('should render without crashing', function () {
    wrapper = shallow(<Loading />);
    expect(wrapper).toBeDefined()
  })
})
