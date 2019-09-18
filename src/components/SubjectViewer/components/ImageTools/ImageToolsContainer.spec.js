import { shallow } from 'enzyme'
import React from 'react'
import ImageToolsContainer from './ImageToolsContainer'

describe('Component > ImageToolsContainer', function () {
  it('should render without crashing', function () {
    shallow(<ImageToolsContainer />);
  })
})
