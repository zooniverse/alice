import React from 'react'
import { Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText, StyledList, StyledListItem } from './components/Styled'

export default function About () {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Acknowledgements' />
      <BodyText>
        The following Zooniverse team members contributed to the creation of ALICE:
      </BodyText>
      <StyledList>
        <StyledListItem>Samantha Blickhan, Project director</StyledListItem>
        <StyledListItem>Nicole Ciemniak, Back-end developer</StyledListItem>
        <StyledListItem>Will Granger, Front-end developer</StyledListItem>
        <StyledListItem>Coleman Krawczyk, Data scientist</StyledListItem>
        <StyledListItem>Shaun Noordin, Front-end developer</StyledListItem>
        <StyledListItem>Becky Rother, Designer</StyledListItem>
        <StyledListItem>Zach Wolfenbarger, Back-end developer</StyledListItem>
      </StyledList>
      <BodyText>
        Support for ALICE was provided by a Digital Humanities Advancement Grant from the
        National Endowment for the Humanities (‘Advancing Access to Transcribed Text in
        Citizen Humanities‘, Grant number HAA-263825-19).
      </BodyText>
    </Box>
  )
}

