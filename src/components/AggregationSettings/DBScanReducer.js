import React from 'react'
import { Box, Button, Text } from 'grommet'
import { Field, Formik } from 'formik'
import styled from 'styled-components'
import { func } from 'prop-types'
import { SCREENS } from './AggregationSettingsContainer'

const StyledNumberInput = styled(Field)`
  border: 1px solid #979797;
  border-radius: 0.25em;
  height: 2em;
  text-align: center;
`

export default function DBScanReducer({ setScreen }) {
  return (
    <Box gap='small' direction='row'>
      <Formik
        initialValues={{
          epsSlope: 25,
          epsLine: 40,
          epsWord: 40,
          gutterTol: 0,
          minSamples: 1,
          minWordCount: 1
        }}
      >
        {({ errors }) => (
          <Box gap='small'>
            <Text>DBSCAN Reducer</Text>

            <Box direction='row' gap='small'>
              <Box basis='large'>
                <Text weight='bold'>eps_slope</Text>
                <Text>
                  Increase if too many angle clusters are found, decrease if
                  there are too few.
                </Text>
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
              </Box>
              <Box basis='xsmall'>
                <StyledNumberInput name='minWordCount' type='number' min='1' step='1' />
              </Box>
            </Box>

            <Box
              border='top'
              direction='row'
              gap='small'
              justify='between'
              pad={{ top: 'xsmall' }}
            >
              <Button
                label={<Text size='small'>BACK TO ALGORITHM CHOICE</Text>}
                onClick={() => setScreen(SCREENS.CHOOSE_REDUCER)}
                plain
              />
              <Box direction='row' gap='small'>
                <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain />
                <Button
                  label={<Text size='small'>APPLY</Text>}
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
  setScreen: () => {}
}

DBScanReducer.propTypes = {
  setScreen: func
}
