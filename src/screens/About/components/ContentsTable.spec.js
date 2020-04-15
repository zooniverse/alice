import { shallow } from 'enzyme'
import React from 'react'
import ContentsTable from './ContentsTable'

describe('Component > ContentsTable', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ContentsTable />);
    expect(wrapper).toBeDefined()
  })
})
