import React from 'react'
import { Anchor, Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText, StyledList, StyledListItem } from './components/Styled'

export default function Setup() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='DBSCAN' />
      <BodyText>
        This process is designed to aggregate text that has been transcribed
        word-by-word (i.e. one submitted transcription may contain a full line
        of text, while others include only single words from the same line,
        with the intent that each will be properly combined). This method is
        based on the
        <Anchor
          href='https://en.wikipedia.org/wiki/DBSCAN'
          label='DBSCAN algorithm'
          margin={{ horizontal: '0.2em' }}
        />
        for finding clusters within data.
      </BodyText>
      <AboutTitle distinction='_DBSCAN' level={6} title='Adjustable parameters' />
      <StyledList>
        <StyledListItem>
          <b>eps_slope</b> This represents how close the angle (in degrees) of
          two lines need to be in order to be placed in the same angle cluster.
          Increase this value if too many angle clusters are found, decrease it
          if there are too few.
          <StyledList>
            <StyledListItem>Data type = Float between <b>0</b> and <b>180</b></StyledListItem>
            <StyledListItem>Unit = Degrees</StyledListItem>
            <StyledListItem>Default value = <b>25</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>eps_line</b> This represents how close vertically (in image pixels)
          two lines need to be in order to be identified as the same line. Increase
          this number if a single line of text is being identified multiple times,
          decrease it if multiple lines of text are being clustered together.
          <StyledList>
            <StyledListItem>Data type = Float greater than <b>0</b></StyledListItem>
            <StyledListItem>Unit = Pixels</StyledListItem>
            <StyledListItem>Default value = <b>40</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>eps_word</b> This represents how close horizontally (in image pixels)
          the end points of a line need to be in order to be identified as a single
          point.
          <StyledList>
            <StyledListItem>Data type = Float greater than <b>0</b></StyledListItem>
            <StyledListItem>Unit = Pixels</StyledListItem>
            <StyledListItem>Default value = <b>40</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>gutter_tol</b> This represents how much neighboring columns can
          overlap horizontally (in image pixels) and still be identified as
          multiple columns. Increase this value if neighboring columns of text
          are not being separated as multiple columns. This will only work if
          there are no annotations that bridge the gap between the columns.
          <StyledList>
            <StyledListItem>Data type = Float greater than or equal to <b>0</b></StyledListItem>
            <StyledListItem>Unit = Pixels</StyledListItem>
            <StyledListItem>Default value = <b>0</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>min_samples</b> This represents how many transcribed lines need to
          be close together to form a cluster (the solid colored markings on the
          images)..  Set this to 1 for all annotations to be kept.  Increase
          this value to remove outlier annotations from the aggregation.
          <StyledList>
            <StyledListItem>Data type = Integer greater than or equal to <b>1</b></StyledListItem>
            <StyledListItem>Unit = None</StyledListItem>
            <StyledListItem>Default value = <b>1</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>min_word_count</b> This represents the minimum number of times a
          word must be identified for it to be kept in the aggregate transcription.
          Increasing this number will only keep high consensus words in the final text.
          <StyledList>
            <StyledListItem>Data type = Integer greater than or equal to <b>1</b></StyledListItem>
            <StyledListItem>Unit = None</StyledListItem>
            <StyledListItem>Default value = <b>1</b></StyledListItem>
          </StyledList>
        </StyledListItem>
      </StyledList>
      <AboutTitle level={4} title='Data exports' />
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
