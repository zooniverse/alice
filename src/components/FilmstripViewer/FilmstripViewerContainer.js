import React, { Component } from 'react'
import FilmstripViewer from './FilmstripViewer'
import Page1 from '../../images/mockImages/page1.jpg'
import Page2 from '../../images/mockImages/page2.jpg'
import Page3 from '../../images/mockImages/page3.jpg'
import Page4 from '../../images/mockImages/page4.jpg'
import Page5 from '../../images/mockImages/page5.jpg'
import Page6 from '../../images/mockImages/page6.jpg'

export default class FilmstripViewerContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [Page1, Page2, Page3, Page4, Page5, Page6],
      isOpen: true
    }
  }

  onToggle = e =>
    this.setState({ isOpen: !this.state.isOpen })

  render () {
    const { images, isOpen } = this.state;

    return <FilmstripViewer images={images} isOpen={isOpen} onToggle={this.onToggle} />
  }
}
