import { shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import SubjectViewer from './SubjectViewer'

let wrapper
const contextValues = {
  current: { getBoundingClientRect: () => {} }
}

describe('Component > SubjectViewer', function () {
  describe('loading state', function () {
    beforeEach(function() {
      jest
        .spyOn(React, 'useRef')
        .mockImplementation(() => contextValues)
      wrapper = shallow(<SubjectViewer subjectState={ASYNC_STATES.LOADING} />);
    })

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
    })

    it('should show a loading state', function () {
      const text = wrapper.find('text').first()
      expect(text.props().children).toBe('Loading Subject...')
    })
  })

  describe('error state', function () {
    it('should show an error state', function () {
      const error = "THIS IS AN ERROR"
      jest
        .spyOn(React, 'useRef')
        .mockImplementation(() => contextValues)
      wrapper = shallow(<SubjectViewer error={error} subjectState={ASYNC_STATES.ERROR} />);
      const text = wrapper.find('text').first()
      expect(text.props().children).toBe(`Error: ${error}`)
    })
  })
})
