import { shallow } from 'enzyme'
import PhotoBlock, { CapitalText, StyledImage } from './PhotoBlock'

let wrapper

describe('Component > PhotoBlock', function () {
  beforeEach(function() {
    const photos = [{ alt: 'A photo' },{ alt: 'Another photo' }]
    wrapper = shallow(<PhotoBlock caption='A caption' photos={photos} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct number of photos', function () {
    const images = wrapper.find(StyledImage)
    expect(images.length).toBe(2)
  })

  it('should render a caption', function () {
    const text = wrapper.find(CapitalText)
    expect(text.length).toBe(1)
  })

  describe('with one photo', function () {
    it('should render the photo at auto width', function () {
      const photo = [{ alt: 'Another photo' }]
      wrapper = shallow(<PhotoBlock caption='A caption' photos={photo} />);
      const image = wrapper.find(StyledImage).first()
      expect(image.props().width).toBe('auto')
    })
  })
})
