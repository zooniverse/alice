import { shallow } from 'enzyme'
import UsingAlice from './UsingAlice'

describe('Component > UsingAlice', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<UsingAlice />);
    expect(wrapper).toBeDefined()
  })
})
