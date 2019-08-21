import React from 'react'
import PropTypes from 'prop-types'
import { Anchor, Box, Text } from 'grommet'

function InfoText ({ index, item }) {
  return (
    <Box key={`INFO_${index}`} width='medium'>
      <Text weight='bold'>{item.header}</Text>
      <Box margin={{ vertical: 'xsmall' }}>{item.text}</Box>
      <Anchor color='link' href={item.link} size='xsmall'>{item.link}</Anchor>
    </Box>
  )
}

InfoText.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    header: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.func
  })
}

InfoText.defaultProps = {
  index: 0,
  item: null
}

export default InfoText
