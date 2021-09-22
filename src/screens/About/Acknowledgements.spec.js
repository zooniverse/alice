import { shallow } from 'enzyme'
import Acknowledgements from './Acknowledgements'

describe('Component > Acknowledgements', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Acknowledgements />);
    expect(wrapper).toBeDefined()
  })
})
