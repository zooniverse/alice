import { shallow } from 'enzyme'
import React from 'react'
import SubjectLockedModal from './SubjectLockedModal'

let wrapper

describe('Component > SubjectLockedModal', function () {
  beforeAll(function () {
    wrapper = shallow(<SubjectLockedModal />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
