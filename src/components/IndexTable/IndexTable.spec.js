import { shallow } from 'enzyme'
import React from 'react'
import IndexTable from './IndexTable'

describe('Component > IndexTable', function () {
  it('should render without crashing', function () {
    shallow(<IndexTable />);
  })
})
