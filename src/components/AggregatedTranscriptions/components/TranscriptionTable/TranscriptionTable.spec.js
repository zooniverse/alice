import { shallow } from 'enzyme'
import React from 'react'
import mockData from './mockData'
import TranscriptionTable from './TranscriptionTable'
import TranscriptionTableRow from './TranscriptionTableRow'

let wrapper;
let useStateSpy;
let setState = jest.fn()

describe('Component > TranscriptionTable', function () {
  beforeEach(function() {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(<TranscriptionTable data={mockData} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct number of rows', function () {
    expect(mockData.length).toEqual(wrapper.find(TranscriptionTableRow).length)
  })
})
