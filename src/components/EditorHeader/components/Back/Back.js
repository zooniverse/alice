import { Link } from 'react-router-dom'
import { Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function Back({ user }) {
  const link = user ? '/projects' : '/'

  return (
    <StyledLink to={link}>
      <CapitalText color='#5C5C5C'>Back to Viewer/Editor</CapitalText>
    </StyledLink>
  )
}

Back.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string
  })
}

Back.defaultProps = {
  user: null
}
