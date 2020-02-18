import { shallow } from 'enzyme'
import React from 'react'
import FilmstripViewerContainer from './FilmstripViewerContainer'

let wrapper
const resetSpy = jest.fn()
const changeIndexSpy = jest.fn()
const setActiveTranscriptionSpy = jest.fn()

const contextValues = {
  aggregations: { showModal: false },
  image: { reset: resetSpy },
  subjects: { changeIndex: changeIndexSpy },
  transcriptions: { setActiveTranscription: setActiveTranscriptionSpy }
}

describe('Component > FilmstripViewerContainer', function () {
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
