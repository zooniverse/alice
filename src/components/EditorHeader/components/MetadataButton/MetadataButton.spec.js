import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import { MetadataButton } from './MetadataButton'
import mockMetadata from './mockMetadata'

describe('Component > MetadataButton', function () {
  let wrapper

  it('should render without crashing', function () {
    wrapper = shallow(<MetadataButton />);
    expect(wrapper).toBeDefined()
  })

  describe('opened modal', function () {
    let setState

    beforeEach(function() {
      setState = jest.fn()
      const useStateSpy = jest.spyOn(React, 'useState')
      const useRefSpy = jest.spyOn(React, 'useRef')
      useRefSpy.mockImplementation(() => { return { current: {} }})
      useStateSpy.mockImplementation((val) => [true, setState])
      wrapper = shallow(<MetadataButton metadata={mockMetadata} />)
    })

    it('should render all valid metadata', function () {
      const metadataRows = wrapper.findWhere((n) => {
        if (n.key()) {
          return n.key().includes('METADATA_VALUE')
        }
      })
      expect(metadataRows.length).toBe(10)
    })

    it('should call state change with close button click', function () {
      const closeButton = wrapper.find(Button).last()
      closeButton.simulate('click')
      expect(setState).toHaveBeenCalled()
    })
  })
})
