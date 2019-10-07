import React from 'react'
import { Box, Button, Drop, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { shape } from 'prop-types'

export default function MetadataButton({ metadata }) {
  const inputEl = React.useRef(null)
  const [isOpen, toggleDrop] = React.useState(false)

  return (
    <Box width='1em'>
      <Button
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
        onClick={toggleDrop}
        plain
        ref={inputEl}
      />
      {isOpen && (
        <Drop
          align={{ top: 'bottom', left: 'right' }}
          onClickOutside={toggleDrop}
          target={inputEl.current}
        >
          <Box background='white' gap='xsmall' pad='small'>
            <Box direction='row' justify='between'>
              <Text size='large'>Dolor sit amet</Text>
              <Button onClick={() => {toggleDrop(false) }} plain>
                <FontAwesomeIcon icon={faTimesCircle} size='xs' />
              </Button>
            </Box>
            <Box direction='row'>
              <Text size='xsmall'>
                78 PAGES &#8226; 14/2 TRANSCRIBERS/GOLD STANDARD &#8226; TRANSCRIBED LINES &#8226; 1/2 AVERAGE CONSENSUS
              </Text>
            </Box>
            <Box gap='xsmall'>
              {Object.keys(metadata).map((key, i) => {
                return (
                  <Box direction='row' key={`METADATA_VALUE_${i}`}>
                    <Box basis='1/3'>
                      <Text>{key}</Text>
                    </Box>
                    <Box basis='2/3'>
                      <Text>{metadata[key]}</Text>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Drop>
      )}
    </Box>
  )
}

MetadataButton.defaultProps = {
  metadata: null
}

MetadataButton.propTypes = {
  metadata: shape()
}
