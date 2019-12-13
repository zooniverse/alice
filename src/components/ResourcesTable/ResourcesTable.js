import React from 'react'
import { Box, DataTable, Text } from 'grommet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import StepNavigation from '../StepNavigation'


function ResourcesTable(props) {
  const onClickRow = (e) => {
    if (props.onSelection) {
      props.onSelection(e.datum)
    } else {
      const newLocation = props.history.location.pathname + e.datum.link
      props.history.push(newLocation);
    }
  }

  return (
    <Box align='center' background='white' fill='horizontal' margin={{ vertical: 'small' }} pad='medium' round='xsmall'>
      {props.data.length > 0 &&
        <DataTable
          columns={[...props.columns].map(col => ({ ...col }))}
          data={props.data}
          onClickRow={onClickRow}
          pad='xsmall'
          primaryKey="id"
        />
      }
      {props.status === ASYNC_STATES.LOADING && (
        <Box justify='center' direction='row'>
          <Text>Loading...</Text>
          <FontAwesomeIcon icon={faSpinner} spin />
        </Box>
      )}
      {props.status === ASYNC_STATES.ERROR && (
        <Text color='red' textAlign='center'>{props.error}</Text>
      )}

      {props.data.length === 0 && props.status === ASYNC_STATES.READY && (
        <Text textAlign='center'>{`Sorry, we couldn't find any ${props.resource}`}</Text>
      )}
      <StepNavigation
        activeStep={props.activeStep}
        setStep={props.setStep}
        steps={props.steps}
      />
    </Box>
  )
}


ResourcesTable.defaultProps = {
  activeStep: 0,
  columns: [],
  data: [],
  error: '',
  onSelection: null,
  resource: null,
  setStep: () => {},
  status: ASYNC_STATES.IDLE,
  steps: []
}

ResourcesTable.propTypes = {
  activeStep: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  onSelection: PropTypes.func,
  resource: PropTypes.string,
  setStep: PropTypes.func,
  steps: PropTypes.array,
  status: PropTypes.string
}

export default withRouter(ResourcesTable)
export { ResourcesTable }
