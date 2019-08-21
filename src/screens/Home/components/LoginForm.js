import React from 'react'
import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet'
import styled from 'styled-components'
import { FormNextLink } from 'grommet-icons'

const SmallHeader = styled(Heading)`
  font-weight: 300;
`

const CapitalText = styled(Text)`
  line-height: 0.5em;
  text-transform: uppercase;
`

function LoginForm () {
  return (
    <Box
      background='white'
      fill='vertical'
      margin={{ right: 'small' }}
      pad={{ horizontal: 'medium', vertical: 'large' }}>
      <SmallHeader color='black' level="3" margin={{ vertical: 'large' }}>
        Log in with your Zooniverse username to get started
      </SmallHeader>
      <Form>
        <FormField
          name='email'
          required
          htmlFor='email'
        >
          <TextInput id='email' placeholder="e.g. zoofan1@nasa.gov" size='small'/>
        </FormField>
        <Box direction='row' justify='between' wrap>
          <Text size='small'>Email Address</Text>
        </Box>
        <FormField
          name='password'
          htmlFor='password'
          required>
          <TextInput id='password' size='small' type='password'/>
        </FormField>
        <Box direction='row' justify='between' wrap>
          <Text size='small'>Password</Text>
        </Box>
        <Button
          gap='xxsmall'
          icon={<FormNextLink size='small'/>}
          label={<CapitalText size='small'>Sign In</CapitalText>}
          margin={{ top: 'large' }}
          plain
          reverse
          type="submit"
        />
      </Form>
    </Box>
  )
}

export default LoginForm
