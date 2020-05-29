import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, RadioButtonGroup, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  position: relative;
  > label {
    display: flex;
    flex-direction: column;

    > div {
      margin: 0 0.25em;
    }

    > span {
      font-size: 0.75em;
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

    let leftMost = activeStep - 2 < 0 ? 0 : activeStep - 2;
    let rightMost = leftMost + 5;
    if (steps.length > 5 && rightMost > steps.length - 1) {
      leftMost = steps.length - 5
      rightMost = steps.length
    }
    const fiveSteps = steps.slice(leftMost, rightMost)

    if (steps && steps.length > 1) {
      const nextStep = activeStep + 1
      const prevStep = activeStep - 1
      const options = fiveSteps.map((step, index) => {
        // We can't just use index for the value
        // because Grommet is using indexes internally as keys and this will error with a duplicate key
        const value = `step-${step}`
        return {
          disabled,
          label: (step + 1).toString(),
          id: value,
          value
        }
      })

      return (
        <Box direction='row' gap='xxsmall'>
          <Button
            data-index={0}
            disabled={activeStep === 0}
            icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            onClick={() => setStep(0)}
            plain
          />
          <Button
            data-index={prevStep}
            disabled={activeStep === 0}
            icon={<FontAwesomeIcon icon={faAngleLeft} />}
            onClick={() => setStep(prevStep)}
            plain
          />

          {leftMost > 0 && <Text>...</Text>}

          <StyledRadioButtonGroup
            direction='row'
            gap='none'
            name='step-selectors'
            onChange={this.onChange.bind(this)}
            options={options}
            value={`step-${activeStep}`}
          />

          {rightMost < steps.length - 1 && <Text>...</Text>}

          <Button
            data-index={nextStep}
            disabled={activeStep === steps.length - 1}
            icon={<FontAwesomeIcon icon={faAngleRight} />}
            onClick={() => setStep(nextStep)}
            plain
          />
          <Button
            data-index={steps.length - 1}
            disabled={activeStep === steps.length - 1}
            icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
            onClick={() => setStep(steps.length - 1)}
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

export { StyledRadioButtonGroup }
export default StepNavigation
