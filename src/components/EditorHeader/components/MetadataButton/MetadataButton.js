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
  goldStandard,
  id,
  lines,
  metadata,
  pages,
  score,
  status,
  transcribers
}) {
  const targetEl = React.useRef(null)
  const [isOpen, toggleDrop] = React.useState(false)

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
                  {pages} pages &#8226; {transcribers}/{goldStandard} transcribers/gold standard &#8226; {lines} transcribed lines &#8226; {score}/{transcribers} average consensus &#8226; {status}
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
                  return (
                    <TableRow key={`METADATA_VALUE_${i}`}>
                      <TableCell>
                        <CapitalText>{key}</CapitalText>
                      </TableCell>
                      <TableCell>
                        <StyledText>{metadata[key]}</StyledText>
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
  goldStandard: 0,
  id: '',
  lines: 0,
  metadata: null,
  pages: 0,
  score: 0,
  transcribers: 0
}

MetadataButton.propTypes = {
  disabled: bool,
  goldStandard: number,
  id: string,
  lines: number,
  metadata: shape(),
  pages: number,
  score: number,
  transcribers: number
}

export { MetadataButton }
export default withThemeContext(MetadataButton, theme)
