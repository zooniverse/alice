import React, { Component } from 'react'
import FilmstripViewer from './FilmstripViewer'
import Page1 from '../../images/mockImages/page1.jpg'
import Page2 from '../../images/mockImages/page2.jpg'
import Page3 from '../../images/mockImages/page3.jpg'
import Page4 from '../../images/mockImages/page4.jpg'
import Page5 from '../../images/mockImages/page5.jpg'
import Page6 from '../../images/mockImages/page6.jpg'

class FilmstripViewerContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [Page1, Page2, Page3, Page4, Page5, Page6]
    }
  }

  render () {
    return <FilmstripViewer images={this.state.images} />
  }
}

export default FilmstripViewerContainer
