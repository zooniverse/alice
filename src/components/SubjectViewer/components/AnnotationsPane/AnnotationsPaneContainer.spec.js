import { shallow } from 'enzyme'
import React from 'react'
import AnnotationsPaneContainer from './AnnotationsPaneContainer'

let wrapper

const extract = {
  data: { frame0: {} }
}
const contextValues = {
  editor: {
    linesVisible: true
  },
  subjects: { index: 0 },
  transcriptions: {
    current: {
      text: new Map([
        [ 'frame0', [{
          clusters_x: [],
          clusters_y: []
        }] ]
      ])
    },
    extracts: [extract]
  }
}

describe('Component > AnnotationsPaneContainer', function () {
  it('should render with transcriptions', function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation((context) => contextValues)
    wrapper = shallow(<AnnotationsPaneContainer />);
    expect(wrapper).toBeDefined()
  })

  it('should render without transcriptions', function () {
    wrapper = shallow(<AnnotationsPaneContainer />);
  })
})
