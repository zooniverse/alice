import { shallow } from 'enzyme'
import { Button } from 'grommet'
import { Formik } from 'formik'
import { REDUCERS } from './AggregationSettingsContainer'
import OpticsReducer from './OpticsReducer'

let form
let wrapper
let setCallbackSpy = jest.fn()
let setScreenSpy = jest.fn()
const error = 'This is an error'

const initialValues = {
  angleEps: 30,
  auto: false,
  gutterEps: 150,
  minLineLength: 0,
  minSamples: 2,
  xi: 0.05
}

const errors = {
  angleEps: error,
  auto: error,
  gutterEps: error,
  minLineLength: error,
  minSamples: error,
  xi: error
}

describe('Component > OpticsReducer', function () {
  beforeEach(function() {
    wrapper = shallow(<OpticsReducer setCallback={setCallbackSpy} setScreen={setScreenSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('form children', function () {
    beforeEach(function() {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(<Form values={initialValues} />)
    })

    it('should return on back button press', function () {
      const backButton = form.find(Button).first()
      backButton.simulate('click')
      expect(setScreenSpy).toHaveBeenCalledWith(REDUCERS.CHOOSE)
    })

    it('should set the callback on apply press', function () {
      const applyButton = form.find(Button).last()
      applyButton.simulate('click')
      expect(setCallbackSpy).toHaveBeenCalled()
    })
  })

  describe('form children with errors', function () {
    it('should render without crashing', function () {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(<Form errors={errors} values={initialValues} />)
      expect(form).toBeDefined()
    })
  })
})
