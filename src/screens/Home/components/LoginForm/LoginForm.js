import React from 'react'
import { Box, Button, FormField, Heading, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormNextLink } from 'grommet-icons'
import { Formik } from 'formik'

const SmallHeader = styled(Heading)`
  font-weight: 300;
`

const CapitalText = styled(Text)`
  line-height: 0.5em;
  text-transform: uppercase;
`

function LoginForm ({ initialValues, onSubmit }) {
  return (
    <Box
      background='white'
      fill='vertical'
      margin={{ right: 'small' }}
      pad={{ horizontal: 'medium', vertical: 'large' }}>
      <SmallHeader color='black' level="3" margin={{ vertical: 'large' }}>
        Log in with your Zooniverse username to get started
      </SmallHeader>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <Box as='form' onSubmit={handleSubmit}>
            <FormField
              error={errors.email && touched.email && errors.email}
              htmlFor='email'>
              <TextInput
                disabled={isSubmitting}
                id='email'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. zoofan1@nasa.gov"
                required
                size='small'
                type='text'
                value={values.email}/>
            </FormField>
            <Box direction='row' justify='between' wrap>
              <Text size='small'>Email Address</Text>
            </Box>
            <FormField
              error={errors.password && touched.password && errors.password}
              htmlFor='password'>
              <TextInput
                disabled={isSubmitting}
                id='password'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                required
                size='small'
                type='password'
                value={values.password}/>
            </FormField>
            <Box direction='row' justify='between' wrap>
              <Text size='small'>Password</Text>
            </Box>
            <Button
              alignSelf='start'
              disabled={isSubmitting}
              gap='xxsmall'
              icon={<FormNextLink size='small'/>}
              label={<CapitalText size='small'>Sign In</CapitalText>}
              margin={{ top: 'large' }}
              plain
              reverse
              type="submit"
            />
          </Box>
        )}
      </Formik>
    </Box>
  )
}

LoginForm.defaultProps = {
  initialValues: null,
  onSubmit: () => {}
}

LoginForm.propTypes = {
  initialValues: PropTypes.shape(),
  onSubmit:PropTypes.func
}

export default LoginForm
