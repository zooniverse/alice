import { shallow } from 'enzyme'
import DataExports from './DataExports'

describe('Component > DataExports', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DataExports />);
    expect(wrapper).toBeDefined()
  })
})
