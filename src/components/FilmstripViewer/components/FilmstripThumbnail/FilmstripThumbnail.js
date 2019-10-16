import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import styled from 'styled-components'
import AppContext from 'store'

const StyledBox = styled(Box)`
  background-color: rgba(0, 95, 255, 0.14);
  position: absolute;
`

function FilmstripThumbnail ({ index, isActive, rotationDegrees, src }) {
  const store = React.useContext(AppContext)
  const selectImage = () => { store.subject.changeIndex(index) }

  return (
      <Button margin='xsmall' onClick={selectImage}>
        <Box height='xsmall' width='xsmall'>
          {isActive && (
            <StyledBox
              align='center'
              border={{ color: 'blue', size: 'large' }}
              height='xsmall'
              justify='center'
              width='xsmall'>
              {rotationDegrees && <Text color='white' size='xlarge'>{rotationDegrees}&deg;</Text>}
            </StyledBox>
          )}
          <Image fit='cover' src={src} />
        </Box>
      </Button>
  )
}

export default FilmstripThumbnail
