import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormPrevious, FormNext } from 'grommet-icons'

const StyledButton = styled(Button)`
  &:first-of-type {
    margin: 0 10px 0 0;
    padding: 0;
  }
`

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  position: relative;
  > label {
    > div {
      margin-right: 10px;
    }
  }
`

class StepNavigation extends React.Component {
  onChange (event) {
    const { setStep } = this.props
    const indexValue = event.target.value.split('-')[1]
    setStep(Number(indexValue))
  }

  render () {
    const { activeStep, disabled, setStep, steps } = this.props
    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      const options = steps.map((step, index) => {
        // We can't just use index for the value
        // because Grommet is using indexes internally as keys and this will error with a duplicate key
        const value = `step-${index}`
        return {
          disabled,
          id: value,
          value
        }
      })
      return (
        <Box direction='row'>
          <StyledButton
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FormPrevious />}
            onClick={() => setStep(prevStep)}
            plain
          />
          <StyledRadioButtonGroup
            direction='row'
            gap='none'
            name='step-selectors'
            onChange={this.onChange.bind(this)}
            options={options}
            value={`step-${activeStep}`}
          />
          <StyledButton
            data-index={nextStep}
            disabled={activeStep === steps.length - 1}
            icon={<FormNext />}
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
  steps: []
}

StepNavigation.propTypes = {
  activeStep: PropTypes.number,
  disabled: PropTypes.bool,
  setStep: PropTypes.func,
  steps: PropTypes.array
}

export { StyledButton, StyledRadioButtonGroup }
export default StepNavigation
