import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import ChooseReducer from './ChooseReducer'
import { REDUCERS } from './AggregationSettingsContainer'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

let wrapper

describe('Component > ChooseReducer', function () {
  beforeEach(function() {
    wrapper = shallow(<ChooseReducer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render without a selected button', function () {
    const OpticsBox = wrapper.find(Button).first().props().label;
    const opticsTree = renderer.create(OpticsBox).toJSON()
    const DBScanBox = wrapper.find(Button).at(1).props().label;
    const dbScanTree = renderer.create(DBScanBox).toJSON()
    expect(opticsTree).toHaveStyleRule('border', '1px solid transparent')
    expect(dbScanTree).toHaveStyleRule('border', '1px solid transparent')
  })

  describe('props > selectedReducer', function () {
    describe('when optics', function () {
      beforeEach(function() {
        wrapper = shallow(<ChooseReducer selectedReducer={REDUCERS.OPTICS} />)
      })

      it('should highlight the correct box', function () {
        const OpticsBox = wrapper.find(Button).first().props().label;
        const tree = renderer.create(OpticsBox).toJSON()
        expect(tree).toHaveStyleRule('background', '#F5F5F5')
        expect(tree).toHaveStyleRule('border', '1px solid #979797')
      })
    })

    describe('when dbscan', function () {
      beforeEach(function() {
        wrapper = shallow(<ChooseReducer selectedReducer={REDUCERS.DBSCAN} />)
      })

      it('should highlight the correct box', function () {
        const DBScanBox = wrapper.find(Button).at(1).props().label;
        const tree = renderer.create(DBScanBox).toJSON()
        expect(tree).toHaveStyleRule('background', '#F5F5F5')
        expect(tree).toHaveStyleRule('border', '1px solid #979797')
      })
    })
  })

  describe('props > onClick functions', function () {
    const selectReducerSpy = jest.fn()
    const setScreenSpy = jest.fn()

    beforeEach(function() {
      wrapper = shallow(
        <ChooseReducer
          selectReducer={selectReducerSpy}
          setScreen={setScreenSpy}
        />)
    })

    it('should call selectReducer on optics button click', function() {
      const opticsButton = wrapper.find(Button).first()
      opticsButton.simulate('click')
      expect(selectReducerSpy).toHaveBeenCalledWith(REDUCERS.OPTICS)
    })

    it('should call selectReducer on dbscan button click', function() {
      const dbScanButton = wrapper.find(Button).at(1)
      dbScanButton.simulate('click')
      expect(selectReducerSpy).toHaveBeenCalledWith(REDUCERS.DBSCAN)
    })

    it('should call setScreen on next button press', function() {
      const nextButton = wrapper.find(Button).last()
      nextButton.simulate('click')
      expect(setScreenSpy).toHaveBeenCalled()
    })
  })
})
