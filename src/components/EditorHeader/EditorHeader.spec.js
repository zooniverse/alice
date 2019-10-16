import { shallow } from 'enzyme'
import React from 'react'
import MetadataButton from './components/MetadataButton'
import EditorHeader from './EditorHeader'
import MarkApproved from './components/MarkApproved'

let wrapper

describe('Component > EditorHeader', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<EditorHeader />);
    expect(wrapper).toBeDefined()
  })

  it('should render buttons with received props', function () {
    wrapper = shallow(<EditorHeader buttons={[MarkApproved]}/>)
    expect(wrapper.find(MarkApproved).length).toBe(1)
  })

  it('should render the metadata button when available', function () {
    wrapper = shallow(<EditorHeader showMetadata />)
    expect(wrapper.find(MetadataButton).length).toBe(1)
  })
})
