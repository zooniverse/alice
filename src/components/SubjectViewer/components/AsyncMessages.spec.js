import { shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import AsyncMessages from './AsyncMessages'

describe('Component > AsyncMessages', function () {
  it('should render without crashing', function () {
    shallow(<AsyncMessages />);
  })

  it('should render a loading message', function () {
    const wrapper = shallow(<AsyncMessages subjectState={ASYNC_STATES.LOADING} />)
    expect(wrapper.find('text').first().props().children).toBe('Loading Subject...')
  })

  it('should render an error message', function () {
    const wrapper = shallow(<AsyncMessages error='No subject' subjectState={ASYNC_STATES.ERROR} />)
    expect(wrapper.find('text').first().props().children).toBe('Error: No subject')
  })
})
