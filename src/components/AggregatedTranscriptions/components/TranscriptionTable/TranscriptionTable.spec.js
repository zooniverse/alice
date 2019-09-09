import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionTable from './TranscriptionTable'

describe('Component > TranscriptionTable', function () {
  it('should render without crashing', function () {
    shallow(<TranscriptionTable />);
  })
})
