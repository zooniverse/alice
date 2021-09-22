import { shallow } from 'enzyme'
import Footer from './Footer'

let wrapper

describe('Component > Footer', function () {
  beforeEach(function () {
    wrapper = shallow(<Footer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
