import React from 'react'
import { Box, Button, FormField, Select, Text, TextInput } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Formik } from 'formik'
import withThemeContext from '../../helpers/withThemeContext'
import theme from './theme'
import SearchCheckBox from './components/SearchCheckBox'
import { TYPES } from 'store/SearchStore'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ReverseFormField = styled(FormField)`
  flex-direction: column-reverse;

  > span {
    margin: 1em 0em;
    position: absolute;
  }
`

const validateForm = (values) => {
  const boxChecked = Object.values(values).some(value => value && value.valueOf() === true );
  let errors = {}
  if (!boxChecked && values.type.length === 0) {
    errors.type = 'Type is required'
  }
  if (!values.id && !boxChecked && values.type.length > 0) {
    errors.id = 'You must enter an ID'
  }
  if (values.type === TYPES.ZOONIVERSE && values.id && values.id.length && !/^[0-9]*$/.test(values.id)) {
    errors.id = 'Zooniverse ID must be a number'
  }
  return errors
}

function SearchModal({ onClose, onSubmit, initialValues, options, setValue, value }) {
  return (
    <Box background='white' elevation='medium' pad='small' round='xsmall' width='25em'>
      <Box gap='small'>
        <Box align='center' direction='row' justify='between'>
          <Text size='large'>Search or Filter</Text>
          <Button
            a11yTitle="Close Subject Search Modal"
            icon={<FontAwesomeIcon icon={faTimesCircle} />}
            plain
            onClick={onClose}
          />
        </Box>
        <CapitalText>Find a specific subject</CapitalText>
        <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validate={validateForm} validateOnChange={false}>
          {({
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            values
          }) => {
            const disableCheckbox = !!(values.id && values.id.length >= 1);
            const disableInput = Object.values(values).some(value => value && value.valueOf() === true );
            return (
            <Box as='form' onSubmit={handleSubmit} gap='small'>
              <Box direction='row' gap='xsmall' margin={{ bottom: 'xsmall' }}>
                <Box basis='1/3'>
                  <ReverseFormField htmlFor='type' label='ID TYPE' error={errors && errors.type}>
                    <Select
                      disabled={disableInput}
                      dropAlign={{ top: 'top' }}
                      id='type'
                      name='type'
                      options={options}
                      onChange={({ option }) => {
                        setFieldValue('type', option)
                        setValue(option)
                      }}
                      plain
                      value={<Text>{values.type || value}</Text>}
                    />
                  </ReverseFormField>
                </Box>
                <Box basis='2/3'>
                  <ReverseFormField htmlFor='id' label='NAME' error={errors && errors.id}>
                    <TextInput
                      color='red'
                      disabled={disableInput}
                      id='id'
                      name='id'
                      onChange={handleChange}
                      placeholder='eg. 58674'
                      size='small'
                      value={values.id}
                    />
                  </ReverseFormField>
                </Box>
              </Box>
              <CapitalText>Filter subject list by status</CapitalText>
              <Box direction='row' justify='between'>
                <Box gap='small'>
                  <Text weight='bold'>Approval Status</Text>
                  <FormField htmlFor='unseen'>
                    <SearchCheckBox
                      checked={values.unseen}
                      disabled={disableCheckbox}
                      label='UNSEEN'
                      onChange={handleChange}
                      title='unseen'
                    />
                  </FormField>
                  <FormField htmlFor='in_progress'>
                    <SearchCheckBox
                      checked={values.in_progress}
                      disabled={disableCheckbox}
                      label='IN PROGRESS'
                      onChange={handleChange}
                      title='in_progress'
                    />
                  </FormField>
                  <FormField htmlFor='ready'>
                    <SearchCheckBox
                      checked={values.ready}
                      disabled={disableCheckbox}
                      label='READY FOR REVIEW'
                      onChange={handleChange}
                      title='ready'
                    />
                  </FormField>
                  <FormField htmlFor='approved'>
                    <SearchCheckBox
                      checked={values.approved}
                      disabled={disableCheckbox}
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
                      disabled={disableCheckbox}
                      label='FLAGGED'
                      onChange={handleChange}
                      title='flagged'
                    />
                  </FormField>
                </Box>
              </Box>
              <Box direction='row' justify='between' margin={{ top: 'small' }}>
                <Button
                  a11yTitle="Close Subject Search Modal"
                  onClick={onClose}
                  plain
                >
                  <CapitalText>Close</CapitalText>
                </Button>
                <Button
                  a11yTitle="Submit Subject Search Query"
                  plain
                  type='submit'
                >
                  <CapitalText>Search</CapitalText>
                </Button>
              </Box>
            </Box>
          )}}
        </Formik>
      </Box>
    </Box>
  )
}

export { SearchModal }
export default withThemeContext(SearchModal, theme)
