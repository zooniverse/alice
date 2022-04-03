import { mount, shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import FilmstripViewer from './FilmstripViewer'
import Page1 from '../../images/mockImages/page1.jpg'
import Page2 from '../../images/mockImages/page2.jpg'
import Page3 from '../../images/mockImages/page3.jpg'
import Page4 from '../../images/mockImages/page4.jpg'
import Page5 from '../../images/mockImages/page5.jpg'
import Page6 from '../../images/mockImages/page6.jpg'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import StepNavigation from '../StepNavigation'
import Overlay from '../Overlay'

describe('Component > FilmstripViewer', function () {
  let wrapper;
  const slopeDefinitions = {
    'frame0.0': '0',
    'frame1.0': '90',
    'frame2.0': '0',
    'frame3.0': '0',
    'frame4.0': '0',
    'frame5.0': '0',
  }

  const slopeKeys = ['frame0.0', 'frame1.0', 'frame2.0', 'frame3.0', 'frame4.0', 'frame5.0']

  beforeEach(function() {
    wrapper = mount(
      <FilmstripViewer
        images={[Page1, Page2, Page3, Page4, Page5, Page6]}
        slopeDefinitions={slopeDefinitions}
        slopeKeys={slopeKeys}
      />)
  })

  it('renders without crashing', function () {})

  it('shows Thumbnails', function () {
    const thumbnailLength = wrapper.find(FilmstripThumbnail).length
    expect(thumbnailLength).toEqual(6)
  })

  it('should show an overlay when disabled', function () {
    wrapper = shallow(<FilmstripViewer disabled />)
    expect(wrapper.find(Overlay).length).toBe(1)
  })

  it('should reset slopeValues if slopeKeys change', function () {
    const newKeys = slopeKeys.slice()
    newKeys.push('frame0.1')
    wrapper.setProps({ slopeKeys: newKeys })
    wrapper.update()
    const thumbnailLength = wrapper.find(FilmstripThumbnail).length
    expect(thumbnailLength).toBe(7)
  })
})
