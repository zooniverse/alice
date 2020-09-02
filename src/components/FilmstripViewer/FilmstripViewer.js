import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import isEqual from 'helpers/isEqual'
import { spotInGroup, getPage, getSlopeLabel } from 'helpers/slopeHelpers'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import Overlay from '../Overlay'

const RelativeBox = styled(Box)`
  position: relative;
`

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

function usePrevious(rawValue) {
  const value = rawValue.map(l => l)
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function FilmstripViewer ({
  activeSlope,
  disabled,
  draggable,
  images,
  rearrangePages,
  selectImage,
  slopeDefinitions,
  slopeKeys,
  subjectIndex
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState()
  const [slopeValues, setSlopeValues] = React.useState(slopeKeys)
  const [canDelete, setCanDelete] = React.useState(false)
  const previous = usePrevious(slopeKeys)

  if (!isEqual(previous, slopeKeys) && slopeKeys !== slopeValues) {
    setSlopeValues(slopeKeys)
  }

  const handlePageRearrangement = () => rearrangePages(slopeValues)

  return (
    <RelativeBox background='#FFFFFF' pad='xsmall' round={{ size: 'xsmall', corner: 'top' }}>
      {disabled && <Overlay />}
      <Box direction='row' justify='between'>
        <Text size='1em'>All Pages</Text>
        <Button
          label={<Uppercase>Delete Pages</Uppercase>}
          onClick={() => setCanDelete(!canDelete)}
          plain
        />
      </Box>
          <Box direction='row' wrap>
            {slopeValues.map((key, i) => {
              const page = getPage(key)
              const slopeIndex = getSlopeLabel(key)
              const image = images[page]
              const isActive = page === subjectIndex && slopeIndex === activeSlope
              const slopeDefinition = slopeDefinitions[key]
              const border = spotInGroup(slopeValues, i)

              return (
                <Box border={border} key={`THUMBNAIL_${i}`} margin={{ bottom: 'xsmall' }}>
                  <FilmstripThumbnail
                    canDelete={canDelete}
                    disabled={disabled}
                    draggable={draggable}
                    hoveredIndex={hoveredIndex}
                    index={i}
                    isActive={isActive}
                    page={page}
                    rearrangePages={handlePageRearrangement}
                    selectImage={selectImage}
                    setHoveredIndex={setHoveredIndex}
                    setSlopeValues={setSlopeValues}
                    slopeDefinition={slopeDefinition}
                    slopeIndex={slopeIndex}
                    slopeValues={slopeValues}
                    src={image}
                  />
                </Box>
            )})}
          </Box>
    </RelativeBox>
  )
}

FilmstripViewer.defaultProps = {
  disabled: false,
  draggable: true,
  images: [],
  selectImage: () => {},
  setSlopeKeys: () => {},
  slopeKeys: [],
  subjectIndex: 0
}

FilmstripViewer.propTypes = {
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
  selectImage: PropTypes.func,
  setSlopeKeys: PropTypes.func,
  slopeKeys: PropTypes.arrayOf(PropTypes.string),
  subjectIndex: PropTypes.number
}

export default observer(FilmstripViewer)
