import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewer from './SubjectViewer'

let wrapper

describe('Component > SubjectViewer', function () {
  beforeEach(function() {
    const useRefSpy = jest.spyOn(React, 'useRef')
    useRefSpy.mockImplementation(() => { return { current: {
      getBoundingClientRect: () => {}
    } }})
    wrapper = shallow(<SubjectViewer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
