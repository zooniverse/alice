import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import Thumbnail from './components/Thumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const RoundedBox = styled(Box)`
  border-radius: 0.25em;
`

function FilmstripViewer ({ images }) {
  return (
    <RoundedBox background='#FFFFFF' pad='small'>
      <Box direction='row' justify='between' >
        <Text>All pages</Text>
        <Box align='center' direction='row' gap='xsmall'>
          <Text>Collapse Filmstrip</Text>
          <FontAwesomeIcon icon={faCaretDown}/>
        </Box>
      </Box>
      <Box direction='row'>
        <Box border direction='row'>
          <Thumbnail src={images[0]}/>
          <Thumbnail src={images[1]}/>
        </Box>
        <Box direction='row'>
          <Thumbnail src={images[2]}/>
          <Thumbnail src={images[3]}/>
          <Thumbnail src={images[4]}/>
          <Thumbnail src={images[5]}/>
        </Box>
      </Box>
    </RoundedBox>
  )
}

export default FilmstripViewer
