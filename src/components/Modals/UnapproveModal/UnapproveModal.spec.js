import { shallow } from 'enzyme'
import React from 'react'
import UnapproveModal from './UnapproveModal'

let wrapper

describe('Component > UnapproveModal', function () {
  beforeAll(function () {
    wrapper = shallow(<UnapproveModal />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
