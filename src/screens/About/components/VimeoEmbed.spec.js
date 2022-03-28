import { shallow } from 'enzyme'
import React from 'react'
import VimeoEmbed from './VimeoEmbed'

describe('Component > VimeoEmbed', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VimeoEmbed src='test src' title='test title' />);
    expect(wrapper).toBeDefined()
  })
})
