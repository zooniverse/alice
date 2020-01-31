import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import SubjectViewerHeader from './SubjectViewerHeader'

describe('Component > SubjectViewerHeader', function () {
  it('should render without crashing', function () {
    shallow(<SubjectViewerHeader />);
  })

  describe('button with lines visible', function () {
    it("should display 'hide all lines'", function () {
      const wrapper = shallow(<SubjectViewerHeader />);
      const buttonLabelText = wrapper.find(Button).first().props().label.props.children
      expect(buttonLabelText).toBe('HIDE ALL LINES')
    })
  })

  describe('button with lines hidden', function () {
    it("should display 'hide all lines'", function () {
      const wrapper = shallow(<SubjectViewerHeader linesVisible={false} />);
      const buttonLabelText = wrapper.find(Button).first().props().label.props.children
      expect(buttonLabelText).toBe('VIEW ALL LINES')
    })
  })
})
