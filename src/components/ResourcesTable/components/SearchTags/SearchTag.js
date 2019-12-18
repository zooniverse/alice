import React from 'react'
import { Box, Button, Text } from 'grommet'
import { func, string } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function SearchTag({ clearTag, tag, value }) {
  return (
    <Box
      align='center'
      background='light-2'
      direction='row'
      gap='xsmall'
      pad='xsmall'
      round='xsmall'
    >
      <CapitalText>{tag}: {value}</CapitalText>
      <Button
        label={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
        onClick={() => clearTag(tag)}
        plain
      />
    </Box>
  )
}

SearchTag.propTypes = {
  clearTag: func,
  tag: string,
  value: string
}

SearchTag.defaultProps = {
  clearTag: () => {},
  tag: '',
  value: ''
}

export default SearchTag
