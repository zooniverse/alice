import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'

function InfoText ({ index, item }) {
  return (
    <Box key={`INFO_${index}`} margin={{ right: 'small' }}>
      <Heading level='6' weight='bold'>{item && item.header}</Heading>
      <Box>{item && item.content}</Box>
    </Box>
  )
}

InfoText.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    header: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.object
  })
}

InfoText.defaultProps = {
  index: 0,
  item: null
}

export default InfoText
