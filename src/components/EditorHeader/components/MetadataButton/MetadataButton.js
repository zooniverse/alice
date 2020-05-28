import React from 'react'
import {
  Box,
  Button,
  Drop,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Text
} from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { bool, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import withThemeContext from 'helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledTable = styled(Table)`
  table-layout: fixed;
`

const StyledDrop = styled(Drop)`
  background: white;
`

const StyledText = styled(Text)`
  overflow-wrap: break-word;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.4em
`

function MetadataButton({
  disabled,
  goldStandardCount,
  id,
  metadata,
  transcriberCount,
  transcription
}) {
  const targetEl = React.useRef(null)
  const [isOpen, toggleDrop] = React.useState(false)

  console.log('TRANSCRIPTION', transcription);

  const { pages, status, transcribed_lines } = transcription

  return (
    <Box width='1em'>
      <Button
        a11yTitle="Open Metadata Information"
        disabled={disabled}
        icon={
          <Box
            align='center'
            border={{ color: 'black' }}
            height='0.85em'
            width='0.85em'
            justify='center'
            round
          >
            <StyledFontAwesomeIcon icon={faInfo}/>
          </Box>
        }
        onClick={toggleDrop}
        plain
        ref={targetEl}
      />
      {isOpen && (
        <StyledDrop
          align={{ top: 'bottom', left: 'right' }}
          onClickOutside={toggleDrop}
          target={targetEl.current}
        >
          <Box background='white' height='large' overflow='hidden' width='large'>
            <Box basis='20%' pad='small'>
              <Box direction='row' justify='between'>
                <Text size='large'>{`Subject ${id}`}</Text>
                <Button onClick={() => {toggleDrop(false) }} plain>
                  <FontAwesomeIcon icon={faTimesCircle} size='xs' />
                </Button>
              </Box>
              <Box>
                <CapitalText size='xsmall'>
                  {pages} pages &#8226; {transcriberCount}/{goldStandardCount} transcribers/gold standard &#8226; {transcribed_lines} transcribed lines &#8226; {status}
                </CapitalText>
              </Box>
            </Box>
            <Box basis='80%' overflow={{ vertical: 'scroll' }} width='100%'>
              <StyledTable>
                <colgroup>
                  <col width="33%" />
                  <col width="66%" />
                </colgroup>
                <TableBody>
                {metadata && Object.keys(metadata).map((key, i) => {
                  const value = metadata[key]
                  if (!value) return null
                  return (
                    <TableRow key={`METADATA_VALUE_${i}`}>
                      <TableCell>
                        <CapitalText>{key}</CapitalText>
                      </TableCell>
                      <TableCell>
                        <StyledText>{value}</StyledText>
                      </TableCell>
                    </TableRow>
                  )
                })}
                </TableBody>
              </StyledTable>
            </Box>
          </Box>
        </StyledDrop>
      )}
    </Box>
  )
}

MetadataButton.defaultProps = {
  disabled: false,
  goldStandardCount: 0,
  id: '',
  metadata: null,
  transcriberCount: 0,
  transcription: {
    pages: 0,
    status: 'unseen',
    transcribed_lines: 0
  }
}

MetadataButton.propTypes = {
  disabled: bool,
  goldStandardCount: number,
  id: string,
  metadata: shape(),
  transcriberCount: number,
  transcription: shape({
    pages: number,
    status: string,
    transcribed_lines: number
  })
}

export { MetadataButton }
export default withThemeContext(MetadataButton, theme)
