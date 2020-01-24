import { shallow } from 'enzyme'
import React from 'react'
import BadgeContainer from './BadgeContainer'
import Badge from './Badge'

let wrapper
let badgeComponent

const contextValues = {
  aggregations: {
    showModal: false
  },
  auth: {
    logout: () => {},
    user: {
      avatar_src: 'source.jpg',
      display_name: 'Test_User',
    }
  },
  projects: {
    role: 'Researcher'
  },
}

describe('Component > BadgeContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<BadgeContainer />);
    badgeComponent = wrapper.find(Badge)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the Badge component', function () {
    expect(badgeComponent).toHaveLength(1)
  })

  it('should pass the name prop', function () {
    const signOut = badgeComponent.props().signOut
    expect(signOut).toBe(contextValues.auth.logout)
    expect(signOut).toBeInstanceOf(Function)
  })

  it('should pass the signOut prop', function () {
    const src = badgeComponent.props().src
    expect(src).toBe(contextValues.auth.user.avatar_src)
    expect(typeof src).toBe('string')
  })

  it('should pass the src prop', function () {
    const name = badgeComponent.props().name
    expect(name).toBe(contextValues.auth.user.display_name)
    expect(typeof name).toBe('string')
  })
})
