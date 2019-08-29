import React from 'react'
import { Box, Button, FormField, Heading, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormNextLink } from 'grommet-icons'
import { Formik } from 'formik'
import Label from '../Label'

const SmallHeader = styled(Heading)`
  font-weight: 300;
`

const CapitalText = styled(Text)`
  line-height: 0.5em;
  text-transform: uppercase;
`

const StyledFormField = styled(FormField)`
  flex-direction: column-reverse;
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
            <StyledFormField
              error={errors.login && touched.login && errors.login}
              htmlFor='login'
              label={<Label text="Username or Email Address" />}>
              <TextInput
                disabled={isSubmitting}
                id='login'
                name='login'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. zoofan1@nasa.gov"
                required
                size='small'
                type='text'
                value={values.login}/>
            </StyledFormField>
            <StyledFormField
              error={errors.password && touched.password && errors.password}
              htmlFor='password'
              label={<Label text="Password" />}>
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
            </StyledFormField>
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
