import { mount, shallow } from 'enzyme'
import React from 'react'
import { Box } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import { act } from 'react-dom/test-utils'
import { Editor, Resizer } from './Editor'

let wrapper
const checkIfLockedSpy = jest.fn()
const fetchSubjectSpy = jest.fn()
const getResourcesSpy = jest.fn()
const setState = jest.fn()
const preventDefaultSpy = jest.fn()
const setActiveTranscriptionSpy = jest.fn()
const unlockTranscriptionSpy = jest.fn()
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
  aggregations: {
    showModal: false
  },
  editor: {
    layout: 'row'
  },
  getResources: getResourcesSpy,
  image: {
    zoomIn: () => {}
  },
  projects: {
    isViewer: false
  },
  subjects: {
    all: { '1': { locations: [{ 'image': 'site.com' }] } },
    asyncState: ASYNC_STATES.IDLE,
    current: { locations: [{ 'image': 'site.com' }] },
    fetchSubject: fetchSubjectSpy,
  },
  transcriptions: {
    checkIfLocked: checkIfLockedSpy,
    current: undefined,
    extracts: [],
    index: 0,
    setActiveTranscription: setActiveTranscriptionSpy,
    unlockTranscription: unlockTranscriptionSpy
  }
}

describe('Component > Editor', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Editor match={match} />);
    expect(wrapper).toBeDefined()
  })

  describe('UseEffect', function() {
    const map = {}

    beforeEach(async function () {
      window.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
      });

      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => Object.assign({}, contextValues))
      const fourHoursAgo = new Date()
      fourHoursAgo.setHours(-4)
      wrapper = mount(<Editor match={match} testTime={fourHoursAgo} />);
      await act(async () => {
        wrapper.update()
      });
    })

    it('should load resources', function () {
      expect(getResourcesSpy).toHaveBeenCalled()
      expect(fetchSubjectSpy).toHaveBeenCalled()
    })

    it('should correctly unmount', function () {
      wrapper.unmount()
      expect(unlockTranscriptionSpy).toHaveBeenCalled()
    })

    it('should check the time on visibilitychange', function () {
      map.visibilitychange()
      expect(checkIfLockedSpy).toHaveBeenCalled()
    })
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
      const editorBox = wrapper.find(Box).at(2).props()
      editorBox.onMouseLeave()
      expect(setState).toHaveBeenCalledWith(false)
    })

    it('should execute onMouseUp', function () {
      const editorBox = wrapper.find(Box).at(2).props()
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
        const editorBox = wrapper.find(Box).at(2).props()
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
    })

    describe('with layout in column', function () {
      beforeEach(function() {
        const alteredContext = Object.assign({}, contextValues)
        alteredContext.editor.layout = 'column'
        jest
          .spyOn(React, 'useRef')
          .mockImplementation(() => refValue)
        jest
          .spyOn(React, 'useState')
          .mockImplementation((val) => [true, setState])
        jest
          .spyOn(React, 'useContext')
        .mockImplementation(() => alteredContext )
        wrapper = shallow(<Editor match={match} />);
      })

      it('should execute onMouseMove', function () {
        const editorBox = wrapper.find(Box).at(2).props()
        editorBox.onMouseMove(mockEvent)
        expect(preventDefaultSpy).toHaveBeenCalled()
        expect(setState).toHaveBeenCalled()
      })
    })
  })
})
