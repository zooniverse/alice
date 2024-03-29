import { mount, shallow } from 'enzyme'
import React from 'react'
import mockData from './mockData'
import TranscriptionTable from './TranscriptionTable'
import TranscriptionTableRow from './TranscriptionTableRow'

describe('Component > TranscriptionTable', function () {
  let wrapper;
  let useStateSpy;
  let setState = jest.fn()

  beforeEach(function() {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(<TranscriptionTable data={mockData} slopeIndex={0} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct number of rows', function () {
    expect(mockData.length).toEqual(wrapper.find(TranscriptionTableRow).length)
  })

  it('should hide rows without a matching slope', function () {
    wrapper = shallow(<TranscriptionTable data={mockData} slopeIndex={1} />);
    expect(wrapper.find(TranscriptionTableRow).length).toEqual(0)
  })

  describe('useEffect hook', function () {
    it('should reset the data array with a null dragID', function () {
      const setStateSpy = jest.fn()
      jest
        .spyOn(React, 'useState')
        .mockImplementation((init) => [init, setStateSpy])
      wrapper = mount(<TranscriptionTable />)
      expect(setStateSpy).toHaveBeenCalled()
    })

    it('should not reset the data array with a dragID', function () {
      const setStateSpy = jest.fn()
      jest
        .spyOn(React, 'useState')
        .mockImplementation((init) => [[], setStateSpy])
      wrapper = mount(<TranscriptionTable />)
      expect(setStateSpy).not.toHaveBeenCalled()
    })
  })
})
