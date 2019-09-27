import React from 'react'
import { Box, Button, CheckBox, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function SearchModal() {
  return (
    <Box background='white' pad='xsmall' round='xsmall'>
      <Box>
        <Box align='center' direction='row' justify='between'>
          <Text size='large'>Search or Filter</Text>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Box>

        <Box gap='small' margin={{ top: 'small' }}>
          <CapitalText>Find a specific subject</CapitalText>
          <CapitalText>Filter subject list by status</CapitalText>
        </Box>
        <Box direction='row' margin={{ vertical: 'medium' }}>
          <Box gap='small'>
            <Text>Approval Status</Text>
            <CheckBox label='UNREVIEWED'/>
            <CheckBox label='IN PROGRESS'/>
            <CheckBox label='READY FOR REVIEW'/>
            <CheckBox label='APPROVED'/>
          </Box>
          <Box gap='small'>
            <Text>Additional Filters</Text>
            <CheckBox label='Flagged'/>
            <CheckBox label='Low consensus score'/>
          </Box>
        </Box>
        <Box direction='row' justify='between'>
          <Button plain><CapitalText>Close</CapitalText></Button>
          <Button plain><CapitalText>Search</CapitalText></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchModal
