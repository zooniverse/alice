import React from 'react'
import { Box, Button, Select, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import withThemeContext from '../../helpers/withThemeContext'
import theme from './theme'
import SearchCheckBox from './components/SearchCheckBox'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function SearchModal({ options, setValue, value }) {
  return (
    <Box background='white' pad='small' round='xsmall' width='medium'>
      <Box>
        <Box align='center' direction='row' justify='between'>
          <Text size='large'>Search or Filter</Text>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Box>

        <Box gap='small' margin={{ vertical: 'small' }}>
          <CapitalText>Find a specific subject</CapitalText>
          <Box direction='row'>
            <Box border='bottom'>
              <Select
                dropAlign={{ top: 'top' }}
                options={options}
                value={value}
                onChange={({ option }) => setValue(option)}
                placeholder='Select...'
                plain
              />
            </Box>
          </Box>
        </Box>
        <CapitalText>Filter subject list by status</CapitalText>
        <Box direction='row' justify='between' margin={{ vertical: 'small' }}>
          <Box gap='small'>
            <Text weight='bold'>Approval Status</Text>
            <SearchCheckBox label='UNREVIEWED'/>
            <SearchCheckBox label='IN PROGRESS'/>
            <SearchCheckBox label='READY FOR REVIEW'/>
            <SearchCheckBox label='APPROVED'/>
          </Box>
          <Box gap='small'>
            <Text weight='bold'>Additional Filters</Text>
            <SearchCheckBox label='Flagged'/>
            <SearchCheckBox label='Low consensus score'/>
          </Box>
        </Box>
        <Box direction='row' justify='between' margin={{ top: 'small' }}>
          <Button plain><CapitalText>Close</CapitalText></Button>
          <Button plain><CapitalText>Search</CapitalText></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withThemeContext(SearchModal, theme)
