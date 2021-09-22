import { shallow } from 'enzyme'
import * as React from 'react';
import BadgeContainer from './BadgeContainer'
import Badge from './Badge'

let wrapper
let badgeComponent
const logoutSpy = jest.fn()
const unlockTranscriptionSpy = jest.fn()

const contextValues = {
  aggregations: {
    showModal: false
  },
  auth: {
    logout: logoutSpy,
    user: { avatar_src: 'source.jpg' },
    userName: 'Test_User'
  },
  projects: {
    role: 'Researcher'
  },
  transcriptions: {
    isActive: false,
    unlockTranscription: unlockTranscriptionSpy
  }
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

  describe('props > signOut', function () {
    it('should pass the signOut prop', function () {
      const signOut = badgeComponent.props().signOut
      expect(signOut).toBeInstanceOf(Function)
    })

    it('should trigger two store functions', function () {
      badgeComponent.props().signOut()
      expect(logoutSpy).toHaveBeenCalled()
      expect(unlockTranscriptionSpy).toHaveBeenCalled()
    })
  })

  it('should pass the src prop', function () {
    const src = badgeComponent.props().src
    expect(src).toBe(contextValues.auth.user.avatar_src)
    expect(typeof src).toBe('string')
  })

  it('should pass the name prop', function () {
    const name = badgeComponent.props().name
    expect(name).toBe(contextValues.auth.userName)
    expect(typeof name).toBe('string')
  })
})
