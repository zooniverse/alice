import React from 'react'
import { Box, Text } from 'grommet'
import { Field, Formik } from 'formik'
import styled from 'styled-components'

const StyledNumberInput = styled(Field)`
  border: 1px solid #979797;
  border-radius: 0.25em;
  height: 2em;
  text-align: center;
`

const StyledLabel = styled.label`
  font-size: 0.75em;
`

export default function AdjustReducer() {
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
      >
        {({ errors }) => (
          <Box gap='small'>
            <Text>OPTICS Reducer</Text>

            <Box direction='row' gap='small'>
              <Box basis='large'>
                <Text weight='bold'>min_samples</Text>
                <Text>
                  Increase if a single line of text is being identified multiple times,
                  decrease if multiple lines are being clustered together.
                </Text>
              </Box>
              <Box basis='xsmall'>
                <StyledNumberInput name='minSamples' type='number' min='2' />
                <Box align='center' direction='row'>
                  <Field id='auto' name='auto' type='checkbox'/>
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
              </Box>
              <Box basis='xsmall'>
                <StyledNumberInput name='angleEps' type='number' step='0.1' />
              </Box>
            </Box>

            <Box direction='row' gap='small'>
              <Box basis='large'>
                <Text weight='bold'>gutter_eps</Text>
                <Text>
                  How close the 'x' position of thes tart of two lines need to be in
                  order to be placed in the same column cluster. Changes the reading order.
                </Text>
              </Box>
              <Box basis='xsmall'>
                <StyledNumberInput name='gutterEps' type='number' step='0.1' />
              </Box>
            </Box>

            <Box direction='row' gap='small'>
              <Box basis='large'>
                <Text weight='bold'>min_line_length</Text>
                <Text>
                  Used to filter out short lines that were drawn but don't correspond
                  with text in the image.
                </Text>
              </Box>
              <Box basis='xsmall'>
                <StyledNumberInput name='minLineLength' type='number' step='0.1' />
              </Box>
            </Box>

          </Box>
        )}
      </Formik>
    </Box>
  )
}
