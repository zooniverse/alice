import React from 'react'
import { Box, Button, FormField, Select, Text, TextInput } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Formik } from 'formik'
import withThemeContext from '../../helpers/withThemeContext'
import theme from './theme'
import SearchCheckBox from './components/SearchCheckBox'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ReverseFormField = styled(FormField)`
  flex-direction: column-reverse;
`

function SearchModal({ onSubmit, initialValues, options, setValue, value }) {
  return (
    <Box background='white' pad='small' round='xsmall'>
      <Box gap='small'>
        <Box align='center' direction='row' justify='between'>
          <Text size='large'>Search or Filter</Text>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Box>
        <CapitalText>Find a specific subject</CapitalText>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values
          }) => (
            <Box as='form' onSubmit={handleSubmit} gap='small'>
              <Box direction='row' gap='xsmall' margin={{ bottom: 'xsmall' }}>
                <Box basis='1/3'>
                  <ReverseFormField htmlFor='type' label='ID Type'>
                    <Select
                      dropAlign={{ top: 'top' }}
                      id='type'
                      name='type'
                      options={options}
                      onChange={({ option }) => {
                        setFieldValue('type', option)
                        setValue(option)
                      }}
                      plain
                      value={<Text>{value}</Text>}
                    />
                  </ReverseFormField>
                </Box>
                <Box basis='2/3'>
                  <ReverseFormField htmlFor='id' label='Name'>
                    <TextInput
                      id='id'
                      name='id'
                      onChange={handleChange}
                      size='small'
                    />
                  </ReverseFormField>
                </Box>
              </Box>
              <CapitalText>Filter subject list by status</CapitalText>
              <Box direction='row' justify='between'>
                <Box gap='small'>
                  <Text weight='bold'>Approval Status</Text>
                  <FormField htmlFor='unreviewed'>
                    <SearchCheckBox
                      checked={values.unreviewed}
                      label='UNREVIEWED'
                      onChange={handleChange}
                      title='unreviewed'
                    />
                  </FormField>
                  <FormField htmlFor='inProgress'>
                    <SearchCheckBox
                      checked={values.inProgress}
                      label='IN PROGRESS'
                      onChange={handleChange}
                      title='inProgress'
                    />
                  </FormField>
                  <FormField htmlFor='readyForReview'>
                    <SearchCheckBox
                      checked={values.readyForReview}
                      label='READY FOR REVIEW'
                      onChange={handleChange}
                      title='readyForReview'
                    />
                  </FormField>
                  <FormField htmlFor='approved'>
                    <SearchCheckBox
                      checked={values.approved}
                      label='APPROVED'
                      onChange={handleChange}
                      title='approved'
                    />
                  </FormField>
                </Box>
                <Box gap='small'>
                  <Text weight='bold'>Additional Filters</Text>
                  <FormField htmlFor='flagged'>
                    <SearchCheckBox
                      checked={values.flagged}
                      label='Flagged'
                      onChange={handleChange}
                      title='flagged'
                    />
                  </FormField>
                  <FormField htmlFor='lowConsensus'>
                    <SearchCheckBox
                      checked={values.lowConsensus}
                      label='Low consensus score'
                      onChange={handleChange}
                      title='lowConsensus'
                    />
                  </FormField>
                </Box>
              </Box>
              <Box direction='row' justify='between' margin={{ top: 'small' }}>
                <Button plain><CapitalText>Close</CapitalText></Button>
                <Button plain type='submit'><CapitalText>Search</CapitalText></Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default withThemeContext(SearchModal, theme)
