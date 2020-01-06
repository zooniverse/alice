import { shallow } from 'enzyme'
import React from 'react'
import Back from './Back'

let wrapper
const user = { id: '1' };

describe('Component > Back', function () {
  beforeEach(function() {
    wrapper = shallow(<Back />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('when given a guest user', function () {
    it('should route back to home', function () {
      wrapper = shallow(<Back user={user} />)
      expect(wrapper.props().to).toBe('/projects')
    })
  })
})
