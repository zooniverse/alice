import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, RadioButton, RadioButtonGroup, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

class StepNavigation extends React.Component {
  onChange (event) {
    const { setStep } = this.props
    const indexValue = event.target.value.split('-')[1]
    setStep(Number(indexValue))
  }

  render () {
    const { activeStep, disabled, setStep, showLabel, steps, totalPages } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      const options = steps.map((step, index) => {
        // We can't just use index for the value
        // because Grommet is using indexes internally as keys and this will error with a duplicate key
        const value = `step-${step}`
        return {
          disabled,
          id: value,
          label: showLabel ? (step + 1).toString() : null,
          value
        }
      })
      return (
        <Box direction='row' gap='xxsmall'>
          <Button
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FontAwesomeIcon icon={faAngleLeft} />}
            onClick={() => setStep(prevStep)}
            plain
          />

          {activeStep > 2 && (
            <Box direction='row' gap='xxsmall'>
              <RadioButton
                onClick={() => setStep(0)}
                label={1}
                name="First Page"
              />
              <Text>...</Text>
            </Box>
          )}
          <RadioButtonGroup
            direction='row'
            gap='none'
            name='step-selectors'
            onChange={this.onChange.bind(this)}
            options={options}
            value={`step-${activeStep}`}
          />
          {activeStep < totalPages - 3 && (
            <Box direction='row' gap='xxsmall'>
              <Text>...</Text>
              <RadioButton
                onClick={() => setStep(totalPages - 1)}
                label={totalPages}
                name="Last Page"
              />
            </Box>
          )}

          <Button
            data-index={nextStep}
            disabled={activeStep === totalPages - 1}
            icon={<FontAwesomeIcon icon={faAngleRight} />}
            onClick={() => setStep(nextStep)}
            plain
          />
        </Box>
      )
    }
    return null
  }
}

StepNavigation.defaultProps = {
  activeStep: 0,
  disabled: false,
  setStep: () => {},
  showLabel: false,
  steps: []
}

StepNavigation.propTypes = {
  activeStep: PropTypes.number,
  disabled: PropTypes.bool,
  setStep: PropTypes.func,
  showLabel: PropTypes.bool,
  steps: PropTypes.array,
  totalPages: PropTypes.number.isRequired
}

export default StepNavigation
