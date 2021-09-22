import { shallow } from 'enzyme'
import * as React from 'react';
import { Button } from 'grommet'
import { Down, Up } from 'grommet-icons'
import HeaderButton from './HeaderButton'

let wrapper

describe('Component > HeaderButton', function () {
  beforeAll(function () {
    wrapper = shallow(<HeaderButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('with sorting descending', function () {
    it('should show an up arrow', function () {
      const context = {
        search: {
          sort_internal_id: 1
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context )
      wrapper = shallow(<HeaderButton property='internal_id' />);
      wrapper.find(Button).first()
      expect(wrapper.props().icon).toEqual(<Down size='small' />)
    })
  })

  describe('with sorting ascending', function () {
    it('should show an up arrow', function () {
      const context = {
        search: {
          sort_internal_id: 2
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context )
      wrapper = shallow(<HeaderButton property='internal_id' />);
      wrapper.find(Button).first()
      expect(wrapper.props().icon).toEqual(<Up size='small' />)
    })
  })

  it('should call the sortItem function', function () {
    const sortItemSpy = jest.fn()
    const context = {
      search: {
        sort: sortItemSpy
      }
    }
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => context )
    wrapper = shallow(<HeaderButton property='internal_id' />);
    wrapper.find(Button).first().props().onClick()
    expect(sortItemSpy).toHaveBeenCalled()
  })
})
