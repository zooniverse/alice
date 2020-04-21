import styled from 'styled-components'
import { Text } from 'grommet'

const BodyText = styled(Text)`
  line-height: 1.75em;
  max-width: 800px;
`

const StyledList = styled.ul`
  margin: 0;
  max-width: 800px;
`
const StyledListItem = styled.li`
  font-size: 14px;
`

export { BodyText, StyledList, StyledListItem }
