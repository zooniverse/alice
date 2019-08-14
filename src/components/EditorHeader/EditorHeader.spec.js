import { shallow } from 'enzyme'
import React from 'react'
import EditorHeader from './EditorHeader'

describe('Component > EditorHeader', function () {
  it('should render without crashing', function () {
    shallow(<EditorHeader />);
  })
})
