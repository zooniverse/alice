import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewerHeader from './SubjectViewerHeader'

describe('Component > SubjectViewerHeader', function () {
  it('should render without crashing', function () {
    shallow(<SubjectViewerHeader />);
  })
})
