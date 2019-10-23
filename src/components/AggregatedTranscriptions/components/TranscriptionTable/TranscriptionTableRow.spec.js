import { shallow } from 'enzyme'
import React from 'react'
import { Menu } from 'grommet-icons'
import TranscriptionTableRow from './TranscriptionTableRow'
import mockData from './mockData'

let wrapper;
let useStateSpy;
let setDragIDSpy = jest.fn();
let setDataSpy = jest.fn();
let setState = jest.fn();
const preventDefaultSpy = jest.fn()
const mockEvent = { preventDefault: preventDefaultSpy }

describe('Component > TranscriptionTable', function () {
  beforeEach(function() {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(
      <TranscriptionTableRow
        data={mockData}
        dragID={1}
        index={0}
        setData={setDataSpy}
        setDragID={setDragIDSpy}
      />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call setDragID on drag end', function () {
    wrapper.simulate('dragend')
    expect(setDragIDSpy).toHaveBeenCalledWith(null)
  })

  it('should call setHover on mouse enter', function () {
    wrapper.simulate('mouseenter')
    expect(setState).toHaveBeenCalledWith(true)
  })

  it('should call setHover on mouse leave', function () {
    wrapper.simulate('mouseleave')
    expect(setState).toHaveBeenCalledWith(false)
  })

  it('should call handleDragStart on dragStart', function () {
    wrapper.simulate('dragstart')
    expect(setState).toHaveBeenCalledWith(false)
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
  })

  it('should call handleDragEnter on dragEnter', function () {
    wrapper.simulate('dragenter', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
    expect(setDataSpy).toHaveBeenCalled()
  })

  it('should call allowDrop on dragOver', function () {
    wrapper.simulate('dragover', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should correctly style components on hover', function () {
    jest.spyOn(React, 'useState')
      .mockImplementation((init) => [true, setState])
    wrapper = shallow(<TranscriptionTableRow />);
    expect(wrapper.props().elevation).toBe('small')
    expect(wrapper.props().round).toBe('xsmall')

    const hamburger = wrapper.find(Menu).first()
    expect(hamburger.props().color).toBe('black')
  })
})
