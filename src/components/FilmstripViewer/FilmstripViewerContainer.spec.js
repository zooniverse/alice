import { shallow } from 'enzyme'
import React from 'react'
import STATUS from 'helpers/status'
import FilmstripViewerContainer from './FilmstripViewerContainer'

describe('Component > FilmstripViewerContainer', function () {
  let wrapper
  const resetSpy = jest.fn()
  const changeIndexSpy = jest.fn()
  const setActiveTranscriptionSpy = jest.fn()

  const contextValues = {
    aggregations: { showModal: false },
    image: { reset: resetSpy },
    transcriptions: {
      changeIndex: changeIndexSpy,
      setActiveTranscription: setActiveTranscriptionSpy
    }
  }

  it('should render without crashing', function () {
    wrapper = shallow(<FilmstripViewerContainer />);
    expect(wrapper).toBeDefined()
  })

  it('should call store functions on selectImage', function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<FilmstripViewerContainer />)
    wrapper.props().selectImage()
    expect(resetSpy).toHaveBeenCalled()
    expect(changeIndexSpy).toHaveBeenCalled()
  })
})

describe('Context > FilmstripViewerContainer', function () {
  let wrapper
  const resetSpy = jest.fn()
  const changeIndexSpy = jest.fn()
  const setActiveTranscriptionSpy = jest.fn()

  const contextValues = {
    aggregations: { showModal: false },
    image: { reset: resetSpy },
    transcriptions: {
      changeIndex: changeIndexSpy,
      setActiveTranscription: setActiveTranscriptionSpy
    }
  }

  describe('with an approved subject', function () {
    it('should set the draggable prop to false', function () {
      const approvedContext = {
        transcriptions: {
          current: { status: STATUS.APPROVED }
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => Object.assign({}, contextValues, approvedContext ))
      wrapper = shallow(<FilmstripViewerContainer />)
      expect(wrapper.props().draggable).toBe(false)
    })
  })
})
