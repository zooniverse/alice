import { shallow } from 'enzyme'
import React from 'react'
import Back from './Back'

describe('Component > Back', function () {
  let wrapper
  const user = { id: '1' };

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
