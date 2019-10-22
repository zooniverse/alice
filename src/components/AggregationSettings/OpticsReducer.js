import React from 'react'
import { Box, Button, Text } from 'grommet'
import { Field, Formik } from 'formik'
import styled from 'styled-components'
import { func } from 'prop-types'
import * as Yup from 'yup'
import { REDUCERS } from './AggregationSettingsContainer'

const opticsSchema = Yup.object().shape({
  auto: Yup.boolean(),
  minSamples: Yup.number()
    .min(2, 'Must be at least two')
    .max(50, 'Too long'),
  xi: Yup.number()
    .min(0, 'Must be no less than 0')
    .max(1, 'Must not be greater than 1')
    .required('Required'),
  angleEps: Yup.number()
    .min(0, 'Must be at least 0')
    .max(180, 'Must not be greater than 180')
    .required('Required'),
  gutterEps: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
  minLineLength: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
});

const StyledNumberInput = styled(Field)`
  border: 1px solid #979797;
  border-radius: 0.25em;
  height: 2em;
  text-align: center;
`

const StyledLabel = styled.label`
  font-size: 0.75em;
`

export default function OpticsReducer({ setScreen, submitOptics }) {
  return (
    <Box gap='small' direction='row'>
      <Formik
        initialValues={{
          angleEps: 30,
          auto: false,
          gutterEps: 150,
          minLineLength: 0,
          minSamples: 2,
          xi: 0.05,
        }}
        isInitialValid
        validationSchema={opticsSchema}
      >
        {({ errors, isValid }) => (
          <Box as='form' onSubmit={submitOptics} gap='small'>
            <Box gap='xsmall' pad='small'>
              <Text>OPTICS Reducer</Text>

              <Box direction='row' gap='xsmall'>
                <Box basis='large'>
                  <Text weight='bold'>min_samples</Text>
                  <Text>
                    Increase if a single line of text is being identified multiple times,
                    decrease if multiple lines are being clustered together.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.minSamples}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='minSamples' type='number' min='2' />
                  <Box align='center' direction='row'>
                    <Field id='auto' name='auto' type='checkbox' checked/>
                    <StyledLabel htmlFor='auto'>auto</StyledLabel>
                  </Box>
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>xi</Text>
                  <Text>
                    Increase if a single line of text is being identified multiple times,
                    decrease if multiple lines are being clustered together.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.xi}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='xi' type='number' min='0' max='1' step='0.01' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>angle_eps</Text>
                  <Text>
                    How close the angle of two lines need to be in order to be placed in
                    the same angle cluster. Changes the reading order.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.angleEps}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='angleEps' type='number' min='0' max='180' step='0.1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>gutter_eps</Text>
                  <Text>
                    How close the 'x' position of thes tart of two lines need to be in
                    order to be placed in the same column cluster. Changes the reading order.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.gutterEps}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='gutterEps' type='number' min='0' step='0.1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>min_line_length</Text>
                  <Text>
                    Used to filter out short lines that were drawn but don't correspond
                    with text in the image.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.minLineLength}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='minLineLength' type='number' min='0' step='0.1' />
                </Box>
              </Box>
            </Box>
            <Box
              border='top'
              direction='row'
              gap='small'
              justify='between'
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
            >
              <Button
                label={<Text size='small'>BACK TO ALGORITHM CHOICE</Text>}
                onClick={() => setScreen(REDUCERS.CHOOSE)}
                plain
              />
              <Box direction='row' gap='small'>
                <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain />
                <Button
                  disabled={!isValid}
                  label={<Text size='small'>APPLY</Text>}
                  plain
                  type='submit'
                />
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

OpticsReducer.defaultProps = {
  setScreen: () => {}
}

OpticsReducer.propTypes = {
  setScreen: func
}
