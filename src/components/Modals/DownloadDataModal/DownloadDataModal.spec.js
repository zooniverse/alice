import { shallow } from 'enzyme'
import React from 'react'
import { Button, Text } from 'grommet'

import DownloadDataModal from './DownloadDataModal'

let wrapper
const onCloseSpy = jest.fn()

describe('Component > DownloadDataModal', function () {
  beforeEach(function () {
    wrapper = shallow(<DownloadDataModal onClose={onCloseSpy} />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the onClose function on X icon press', function() {
    const xButton = wrapper.find(Button).first()
    xButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })

  it('should call the onClose function on "close" press', function() {
    const closeButton = wrapper.find(Button).at(1)
    closeButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })

  describe('with entireGroup prop', function () {
    beforeEach(function() {
      wrapper = shallow(
        <DownloadDataModal
          approved={5}
          entireGroup
          transcriptionCount={10}
        />)
    })

    it('should set the correct text', function () {
      const header = wrapper.find(Text).first().props()
      expect(header.children).toBe('Download approved subject set data')
    })

    it('should display the approved count', function () {
      const approvedText = wrapper.find(Text).at(1).props()
      expect(approvedText.children).toBe('5/10 SUBJECTS APPROVED')
    })
  })
})
