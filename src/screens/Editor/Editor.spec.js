import { shallow } from 'enzyme'
import React from 'react'
import { Box } from 'grommet'
import SubjectFactory from 'store/factories/subject'
import ASYNC_STATES from 'helpers/asyncStates'
import { Editor, Resizer } from './Editor'

let wrapper
const setState = jest.fn()
const fetchSubjectSpy = jest.fn()
const preventDefaultSpy = jest.fn()
const match = {
  params: {
    subject: 2
  }
}
const rect = {
  top: 10,
  left: 20
}
const refValue = {
  current: {
    clientHeight: 100,
    clientWidth: 100,
    getBoundingClientRect: () => rect
  }
}
const mockEvent = {
  clientX: 0,
  clientY: 0,
  preventDefault: preventDefaultSpy
}
const contextValues = {
  editor: {
    layout: 'row'
  },
  subject: {
    asyncState: ASYNC_STATES.IDLE,
    current: SubjectFactory.build({
      locations: [{ 'image': 'site.com' }]
    }),
    fetchSubject: fetchSubjectSpy
  }
}

describe('Component > Editor', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Editor match={match} />);
    expect(wrapper).toBeDefined()
  })

  describe('Functions', function () {
    beforeEach(function() {
      jest
        .spyOn(React, 'useRef')
        .mockImplementation(() => refValue)
      jest
        .spyOn(React, 'useState')
        .mockImplementation((val) => [val, setState])
      wrapper = shallow(<Editor match={match} />);
    })

    afterEach(() => jest.clearAllMocks());

    it('should execute onMouseDown', function () {
      const resizer = wrapper.find(Resizer).first().props()
      resizer.onMouseDown(mockEvent)
      expect(setState).toHaveBeenCalledWith(true)
      expect(setState).toHaveBeenCalledWith({ x: -20 })
    })

    it('should execute onMouseLeave', function () {
      const editorBox = wrapper.find(Box).at(1).props()
      editorBox.onMouseLeave()
      expect(setState).toHaveBeenCalledWith(false)
    })

    it('should execute onMouseUp', function () {
      const editorBox = wrapper.find(Box).at(1).props()
      editorBox.onMouseUp()
      expect(setState).toHaveBeenCalledWith(false)
    })

    describe('isMoving set to true', function () {
      beforeEach(function() {
        jest
          .spyOn(React, 'useRef')
          .mockImplementation(() => refValue)
        jest
          .spyOn(React, 'useState')
          .mockImplementation((val) => [true, setState])
        wrapper = shallow(<Editor match={match} />);
      })

      it('should execute onMouseMove', function () {
        const editorBox = wrapper.find(Box).at(1).props()
        editorBox.onMouseMove(mockEvent)
        expect(preventDefaultSpy).toHaveBeenCalled()
        expect(setState).toHaveBeenCalled()
      })
    })

    describe('setting subjects', function () {
      beforeEach(function() {
        jest
          .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
        wrapper = shallow(<Editor match={match} />);
      })

      it('should attempt to fetch a subject', function () {
        expect(fetchSubjectSpy).toHaveBeenCalledWith(2)
      })
    })
  })
})
