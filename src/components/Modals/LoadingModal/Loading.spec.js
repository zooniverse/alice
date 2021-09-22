import { shallow } from 'enzyme'
import Loading from './Loading'

let wrapper

describe('Component > Loading', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Loading />);
    expect(wrapper).toBeDefined()
  })
})
