import React from 'react'
import { Box, Button, Text } from 'grommet'
import { Field, Formik } from 'formik'
import styled from 'styled-components'
import { func } from 'prop-types'
import * as Yup from 'yup'
import { REDUCERS } from './AggregationSettingsContainer'

const StyledNumberInput = styled(Field)`
  border: 1px solid #979797;
  border-radius: 0.25em;
  height: 2em;
  text-align: center;
`

const dbScanSchema = Yup.object().shape({
  epsSlope: Yup.number()
    .min(0, 'Must be at least zero')
    .max(180, 'Must not be greater than 180')
    .required('Required'),
  epsLine: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
  epsWord: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
  gutterTol: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
  minSamples: Yup.number()
    .min(1, 'Must be at least 1')
    .required('Required'),
  minWordCount: Yup.number()
    .min(1, 'Must be at least 1')
    .required('Required')
});

export default function DBScanReducer({ setScreen, submitDBScan, toggleSettings }) {
  return (
    <Box gap='xsmall' direction='row'>
      <Formik
        initialValues={{
          epsSlope: 25,
          epsLine: 40,
          epsWord: 40,
          gutterTol: 0,
          minSamples: 1,
          minWordCount: 1
        }}
        isInitialValid
        validationSchema={dbScanSchema}
      >
        {({ errors, isValid }) => (
          <Box as='form' onSubmit={submitDBScan} gap='xsmall'>
            <Box pad='small'>
              <Text>DBSCAN Reducer</Text>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_slope</Text>
                  <Text>
                    Increase if too many angle clusters are found, decrease if
                    there are too few.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.epsSlope}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsSlope' type='number' min='0' max='180' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_line</Text>
                  <Text>
                    Increase if a line of text is identified multiple times,
                    decrease if multiple lines of text are clustered together.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.epsLine}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsLine' type='number' min='0' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_word</Text>
                  <Text>
                    How close horizontally the end points of a line should be
                    to be identified as a single point.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.epsWord}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsWord' type='number' min='0' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>gutter_tol</Text>
                  <Text>
                    Increase if neighboring columns of text are not separated as
                    multiple columns. This only works without annotations bridging
                    the gap between columns.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.gutterTol}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='gutterTol' type='number' min='0' step='0.1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>min_samples</Text>
                  <Text>
                    How many points need to be close together for a cluster to be
                    identified. Set to 1 to keep all annotations. Increase to
                    remove outlier annotations.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.minSamples}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='minSamples' type='number' min='1' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>min_word_count</Text>
                  <Text>
                    Increasing to keep only high consensus words in the final text.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors.minWordCount}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='minWordCount' type='number' min='1' step='1' />
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
                <Button
                  label={<Text size='small'>CLOSE AND CANCEL</Text>}
                  onClick={toggleSettings}
                  plain
                />
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

DBScanReducer.defaultProps = {
  setScreen: () => {}
}

DBScanReducer.propTypes = {
  setScreen: func
}
