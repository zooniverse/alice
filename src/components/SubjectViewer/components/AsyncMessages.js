import ASYNC_STATES from 'helpers/asyncStates'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { string } from 'prop-types'

const AbsoluteBox = styled(Box)`
  position: absolute;
`

function AsyncMessages({ error, subjectState }) {
  return (
    <AbsoluteBox align='center' fill justify='center' pad='small'>
      {subjectState === ASYNC_STATES.LOADING && (
        <Text color='black' size='large'>Loading Subject...</Text>
      )}
      {subjectState === ASYNC_STATES.ERROR && (
        <Text color='red' size='large'>{`Error: ${error}`}</Text>
      )}
    </AbsoluteBox>
  )
}

AsyncMessages.propTypes = {
  error: string,
  subjectState: string
}

AsyncMessages.defaultProps = {
  error: '',
  subjectState: ''
}

export default AsyncMessages
