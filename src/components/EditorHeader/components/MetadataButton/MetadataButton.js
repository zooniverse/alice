import React from 'react'
import { Box, Button, Drop, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function MetadataButton({ goldStandard, id, lines, metadata, pages, score, transcribers }) {
  const targetEl = React.useRef(null)
  const [isOpen, toggleDrop] = React.useState(false)

  return (
    <Box width='1em'>
      <Button
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
        onClick={toggleDrop}
        plain
        ref={targetEl}
      />
      {isOpen && (
        <Drop
          align={{ top: 'bottom', left: 'right' }}
          onClickOutside={toggleDrop}
          target={targetEl.current}
        >
          <Box background='white' gap='xsmall' pad='small'>
            <Box direction='row' justify='between'>
              <Text size='large'>{`Subject ${id}`}</Text>
              <Button onClick={() => {toggleDrop(false) }} plain>
                <FontAwesomeIcon icon={faTimesCircle} size='xs' />
              </Button>
            </Box>
            <Box direction='row'>
              <CapitalText size='xsmall'>
                {pages} pages &#8226; {transcribers}/{goldStandard} transcribers/gold standard &#8226; {lines} transcribed lines &#8226; {score}/{transcribers} average consensus
              </CapitalText>
            </Box>
            <Box gap='xsmall'>
              {metadata && Object.keys(metadata).map((key, i) => {
                return (
                  <Box direction='row' key={`METADATA_VALUE_${i}`}>
                    <Box basis='1/3'>
                      <CapitalText>{key}</CapitalText>
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
  goldStandard: 0,
  id: '',
  lines: 0,
  metadata: null,
  pages: 0,
  score: 0,
  transcribers: 0
}

MetadataButton.propTypes = {
  goldStandard: number,
  id: string,
  lines: number,
  metadata: shape(),
  pages: number,
  score: number,
  transcribers: number
}
