import React from 'react'
import { Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText, StyledList, StyledListItem } from './components/Styled'

export default function DataExports() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Data exports' />
      <BodyText>
        You can download data exports for individual subjects, or for all approved
        subjects within a group.
      </BodyText>
      <BodyText>
        To download the data export for an individual subject, first make sure
        you’re viewing that subject in ALICE and that the subject is approved.
        Then, choose ‘More’ in the menu at the top of the page, and select ‘Download
        Subject Data’ from the dropdown menu.
      </BodyText>
      <BodyText>
        To download a data export for all approved subjects in a group, first
        make sure you’re viewing the list of subjects within that group. Then,
        click ‘Download Approved Group Data’ at the top of the page.
      </BodyText>
      <BodyText>
        Data exports will only become available when a subject has been Approved.
        Marking a subject as ‘Approved’ will allow the ability to generate a
        data export. All data exports are made up of the following three files:
      </BodyText>
      <StyledList>
        <StyledListItem>A data table with the metadata created in the app (.csv)</StyledListItem>
        <StyledListItem>Line by line transcription and metadata (.csv)</StyledListItem>
        <StyledListItem>A file with the selected transcription only (.txt)</StyledListItem>
        <StyledListItem>Raw, unparsed transcription data (.json)</StyledListItem>
      </StyledList>
    </Box>
  )
}