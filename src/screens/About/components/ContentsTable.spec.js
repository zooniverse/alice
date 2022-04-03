import { mount } from 'enzyme'
import React from 'react'
import ContentsTable from './ContentsTable'

describe('Component > ContentsTable', function () {
  const ref = React.createRef()
  ref.current = { getBoundingClientRect: () => {
    return {
      height: 100,
      width: 100
    }
  } }

  describe('with a ref', function () {
    it('should render without crashing', function () {
      const wrapper = mount(
        <div>
          <ContentsTable ref={ref} />
        </div>);
        expect(wrapper).toBeDefined()
      })
  })

  describe('without a ref', function () {
    it('should render without crashing', function () {
      const wrapper = mount(
        <div>
          <ContentsTable />
        </div>);
        expect(wrapper).toBeDefined()
      })
  })
})
