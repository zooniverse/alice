import React from 'react'
import { Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import { BodyText, StyledList, StyledListItem } from './components/Styled'

export default function About () {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Acknowledgements' />
      <BodyText>
        Support for ALICE was provided by a Digital Humanities Advancement Grant from the
        National Endowment for the Humanities (‘Advancing Access to Transcribed Text in
        Citizen Humanities‘, Grant number HAA-263825-19).
      </BodyText>
      <AboutTitle level={6} title='Project Team' />
      <BodyText>
        The following Zooniverse team members contributed to the creation of ALICE:
      </BodyText>
      <StyledList>
        <StyledListItem>Dr. Samantha Blickhan, Project director</StyledListItem>
        <StyledListItem>Nicole Ciemniak, Back-end developer</StyledListItem>
        <StyledListItem>Will Granger, Front-end developer</StyledListItem>
        <StyledListItem>Dr. Coleman Krawczyk, Data scientist</StyledListItem>
        <StyledListItem>Shaun Noordin, Front-end developer</StyledListItem>
        <StyledListItem>Becky Rother, Designer</StyledListItem>
        <StyledListItem>Zach Wolfenbarger, Back-end developer</StyledListItem>
        <StyledListItem>Michelle Yuen, Back-end developer</StyledListItem>
      </StyledList>
      <AboutTitle level={6} title='Advisory Board' />
      <BodyText>
        The following individuals were members of the ALICE advisory board from 2018 - 2021:
      </BodyText>
      <StyledList>
       <StyledListItem>Dr. Benjamin Albritton, Stanford University Libraries</StyledListItem>
       <StyledListItem>Ryan Bean, University of Minnesota Libraries</StyledListItem>
       <StyledListItem>Tom Blake, Collections Management, Access, and Engagement Advisor</StyledListItem>
       <StyledListItem>Dr. Lucy Fortson, University of Minnesota</StyledListItem>
       <StyledListItem>Prof. Chris Lintott, University of Oxford</StyledListItem>
       <StyledListItem>Jason Roy, University of Minnesota Libraries</StyledListItem>
       <StyledListItem>Dr. Victoria Van Hyning, University of Maryland</StyledListItem>
      </StyledList>
      <AboutTitle level={6} title='Special Thanks' />
      <BodyText>
        The project team wishes to thank George Taylor, who prepared a critical review of ALICE as part of a Digital Humanities work placement offered through the University of London Department of Information Studies.
      </BodyText>
    </Box>
  )
}

