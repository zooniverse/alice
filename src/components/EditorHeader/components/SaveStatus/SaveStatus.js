import { func, string } from 'prop-types'
import { Button, Text } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import withThemeContext from 'helpers/withThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import theme from './theme'

function SaveStatus({ status, toggleError }) {
  const saving = status === ASYNC_STATES.LOADING
  const showError = status === ASYNC_STATES.ERROR
  const color = showError ? '#FF0000' : '#5C5C5C'
  const text = showError ? 'CHANGES NOT SAVED' :
    saving ? 'SAVING...' : 'ALL CHANGES SAVED'

  return (
    <Button
      disabled={!showError}
      icon={<FontAwesomeIcon icon={faExclamation} color={showError ? '#FF0000' : 'transparent'} size='xs' />}
      label={<Text color={color}>{text}</Text>}
      onClick={toggleError}
      plain
    />
  )
}

SaveStatus.propTypes = {
  status: string,
  toggleError: func
}

SaveStatus.defaultProps = {
  status: ASYNC_STATES.IDLE,
  toggleError: () => {}
}

export { SaveStatus }
export default withThemeContext(SaveStatus, theme)
