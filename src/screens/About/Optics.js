import React from 'react'
import { Anchor, Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText, StyledList, StyledListItem } from './components/Styled'

export default function Setup() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='OPTICS' />
      <BodyText>
        This process is designed to aggregate text that has been transcribed
        line-by-line (i.e. each submitted transcription contains a full line of
        text). This method is based on the
        <Anchor
          href='https://en.wikipedia.org/wiki/OPTICS_algorithm'
          label='OPTICS algorithm'
          margin={{ horizontal: '0.2em' }}
        />
        for finding clusters within data.
      </BodyText>
      <AboutTitle distinction='_OPTICS' level={6} title='Adjustable parameters' />
      <StyledList>
        <StyledListItem>
          <b>min_samples</b> This represents the smallest number of transcribed
          lines needed to form a cluster (the solid colored markings on the images).
          Increase the value if a single line of text is being identified multiple
          times, decrease the value if multiple lines are being clustered together.
          <StyledList>
            <StyledListItem>
              Data type = Integer greater than <b>2</b> or the string <b>auto</b>
            </StyledListItem>
            <StyledListItem>Unit = None</StyledListItem>
            <StyledListItem>Default value = <b>auto</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>xi</b> This determines the minimum steepness on the reachability
          plot that constitutes a cluster boundary. Increase the value if a single
          line of text is being identified multiple times, decrease the value
          if multiple lines are being clustered together.  In most cases changing
          min_samples should be enough; only change this value for fine-tuning
          the clustering.
          <StyledList>
            <StyledListItem>Data type = Float between <b>0</b> and <b>1</b></StyledListItem>
            <StyledListItem>Unit = None</StyledListItem>
            <StyledListItem>Default value = <b>0.05</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>angle_eps</b> This represents how close the angle (in degrees) of
          two lines need to be in order to be placed in the same angle cluster.
          Editing this value will only change the reading order of the transcribed
          lines.
          <StyledList>
            <StyledListItem>Data type = Float between <b>0</b> and <b>180</b></StyledListItem>
            <StyledListItem>Unit = Degrees</StyledListItem>
            <StyledListItem>Default value = <b>30</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>gutter_eps</b> This represents how close the ‘x’ position (in image
          pixels) of the start of two lines need to be in order to be placed in
          the same column cluster. Editing this value will only change the reading
          order. E.g. if the subject contains indentation for the first line of
          a paragraph this should be set to at least the saze (in pixels) of that
          indentation.
          <StyledList>
            <StyledListItem>Data type = Float greater than <b>0</b></StyledListItem>
            <StyledListItem>Unit = Pixels</StyledListItem>
            <StyledListItem>Default value = <b>150</b></StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
            <b>min_line_length</b> This represents the minimum length (in image
            pixels) a transcribed line of text needs to be in order to be considered
            valid. Editing this value will filter out short lines that were drawn
            but did not correspond to any text on the image.
          <StyledList>
            <StyledListItem>Data type = Float greater than or equal to <b>0</b></StyledListItem>
            <StyledListItem>Unit = Pixels</StyledListItem>
            <StyledListItem>Default value = <b>0</b></StyledListItem>
          </StyledList>
        </StyledListItem>
      </StyledList>
    </Box>
  )
}
