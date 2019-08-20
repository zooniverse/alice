import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

function InfoText ({ index, item }) {
  return (
    <Box key={`INFO_${index}`} width='20vw' margin={{ bottom: 'xlarge' }}>
      <Text size='small' weight='bold'>{item.header}</Text>
      <Text size='small' margin={{ vertical: 'small' }}>{item.text}</Text>
      <Text size='small'>{item.link}</Text>
    </Box>
  )
}

InfoText.defaultProps = {
  index: PropTypes.number,
  item: PropTypes.shape({
    header: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string
  })
}

export default InfoText
