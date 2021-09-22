import { Box, Button, Text } from 'grommet'
import { Field, Formik } from 'formik'
import styled from 'styled-components'
import { func, number, shape } from 'prop-types'
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

export default function DBScanReducer({ closeContainer, defaultParams, setCallback, setScreen, submitDBScan }) {
  return (
    <Box gap='small' direction='row'>
      <Formik
        initialValues={{
          epsSlope: defaultParams.eps_slope || 25,
          epsLine: defaultParams.eps_line || 40,
          epsWord: defaultParams.eps_word || 40,
          gutterTol: defaultParams.gutter_tol || 0,
          minSamples: defaultParams.min_samples || 1,
          minWordCount: defaultParams.min_word_count || 1
        }}
        isInitialValid
        validationSchema={dbScanSchema}
      >
        {({ errors, isValid, values }) => (
          <Box as='form' onSubmit={submitDBScan} gap='small'>
            <Box gap='xsmall' pad='small'>
              <Text>DBSCAN Reducer</Text>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_slope</Text>
                  <Text>
                    Increase if too many angle clusters are found, decrease if
                    there are too few.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.epsSlope}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsSlope' type='number' min='0' max='180' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_line</Text>
                  <Text>
                    Increase this number if a single line of text is being identified
                    multiple times, decrease if multiple lines of text are being
                    clustered together.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.epsLine}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsLine' type='number' min='0' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>eps_word</Text>
                  <Text>
                    How close horizontally the end points of a line need to be in
                    order to be identified as a single point.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.epsWord}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='epsWord' type='number' min='0' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>gutter_tol</Text>
                  <Text>
                    Increase this value if neighboring columns of text are not
                    being separated as multiple columns. This will only work if
                    there are no annotations that bridge the gap between the columns.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.gutterTol}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='gutterTol' type='number' min='0' step='0.1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>min_samples</Text>
                  <Text>
                    For all clustering stages, this is how many points need to be
                    close together for a cluster to be identified. Set this to 1 for
                    all annotations to be kept. Increase this value to remove outlier
                    annotations for the aggregation.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.minSamples}</Text>
                </Box>
                <Box basis='xsmall'>
                  <StyledNumberInput name='minSamples' type='number' min='1' step='1' />
                </Box>
              </Box>

              <Box direction='row' gap='small'>
                <Box basis='large'>
                  <Text weight='bold'>min_word_count</Text>
                  <Text>
                    Increasing this number will only keep high consensus words in
                    the final text.
                  </Text>
                  <Text color='red' margin={{ top: 'xsmall' }} size='xsmall'>{errors && errors.minWordCount}</Text>
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
                  a11yTitle="Close Aggregation Settings"
                  label={<Text size='small'>CLOSE AND CANCEL</Text>}
                  onClick={closeContainer}
                  plain
                />
                <Button
                  disabled={!isValid}
                  label={<Text size='small'>APPLY</Text>}
                  onClick={() => {
                    const callBackWithValues = () => { submitDBScan(values) }
                    setCallback(() => callBackWithValues)
                  }}
                  plain
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
  closeContainer: () => {},
  defaultParams: {},
  setScreen: () => {}
}

DBScanReducer.propTypes = {
  closeContainer: func,
  defaultParams: shape({
    eps_slope: number,
    eps_line: number,
    eps_word: number,
    gutter_tol: number,
    min_samples: number,
    min_word_count: number
  }),
  setScreen: func
}
