import React from 'react'
import { Anchor, Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import PhotoBlock from './components/PhotoBlock'
import { BodyText, StyledList, StyledListItem } from './components/Styled'
import Collaborators from 'images/about/collaborators.png'
import Projects from 'images/about/projects.png'

const CAPTION = `
  The Collaborators tab of the Project Builder interface, where project team
  members can be added in various roles.
`

export default function UsingAlice() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Using ALICE with your team' />
      <BodyText>
        Once you have finished building your project and the Zooniverse team has
        completed the setup, ALICE will be ready for use.
      </BodyText>
      <AboutTitle level={4} title='Logging into ALICE and finding your project' />
      <BodyText>
        Visit
        <Anchor
          href='https://alice.zooniverse.org'
          label='https://alice.zooniverse.org'
          margin={{ horizontal: '0.2em' }}
        />
        and log in with your Zooniverse username
        and password. Once logged in, you will see a list of your ALICE-compatible
        Zooniverse projects, and your designated role on each (Admin, Editor, or
        Viewer). Click on a project to get started.
      </BodyText>
      <PhotoBlock description='PROJECTS' photos={[{ alt: 'ALICE projects index page', photo: Projects }]} />
      <AboutTitle level={4} title='Adding team members & levels of access' />
      <BodyText>
        To grant your team members access to ALICE, they will need individual
        Zooniverse accounts. Each username must be added to the project under the
        Collaborators tab within the Zooniverse Project Builder interface.
      </BodyText>
      <PhotoBlock
        caption={CAPTION}
        description='COLLABORATORS'
        photos={[{ alt: 'Collaborators tab of the Project Builder interface', photo: Collaborators }]}
      />
      <BodyText>
        The Project Builder roles determine what level of access your team members
        will have in ALICE.
      </BodyText>
      <BodyText>
        <b>Admin</b> access: Project owner, Collaborator
      </BodyText>
      <BodyText>
        Admins have full access to all features of ALICE. Admins are able to do the following:
      </BodyText>
      <StyledList>
        <StyledListItem>View subjects</StyledListItem>
        <StyledListItem>Edit subjects</StyledListItem>
        <StyledListItem>Mark subjects as Approved</StyledListItem>
        <StyledListItem>Download subject data</StyledListItem>
      </StyledList>
      <BodyText>
        <b>Editor</b> access: Expert, Researcher, Moderator
      </BodyText>
      <BodyText>
        Editors are able to use all ALICE features except Approve subjects.
        Instead, Editors are able to submit subjects for approval by an Admin.
        Editors are able to do the following:
      </BodyText>
      <StyledList>
        <StyledListItem>View subjects</StyledListItem>
        <StyledListItem>Edit subjects</StyledListItem>
        <StyledListItem>Submit subjects for Approval by Admins</StyledListItem>
        <StyledListItem>Download subject data</StyledListItem>
      </StyledList>
      <BodyText>
        <b>Viewer</b> access: Tester
      </BodyText>
      <BodyText>
        Viewers are able to do the following:
      </BodyText>
      <StyledList>
        <StyledListItem>View subjects</StyledListItem>
      </StyledList>
      <AboutTitle level={4} title='Viewing' />
      <AboutTitle level={6} title='Viewing workflows' />
      <BodyText>
        Once you’ve selected your project from the list on the ALICE homepage,
        you will see a list of all ALICE-compatible <b>workflows</b> for that
        project, as well as information about their corresponding <b>workflow ID</b>,
        the number of <b>groups</b> within the workflow, and total number of <b>subjects</b>.
      </BodyText>
      <BodyText>
        Please note that data from any additional project workflows which are not
        ALICE-compatible will not be shown in this list. To access results from
        those workflows, download your project data export from the Project Builder.
      </BodyText>
      <AboutTitle level={6} title='Viewing groups' />
      <BodyText>
        When you select a workflow from the list, you will be taken to a new page
        that shows a list of the groups within that particular workflow, their
        corresponding group ID, and a timestamp of when the last edit was made
        to a subject within that group.
      </BodyText>
      <BodyText>
        Selecting a group will open a new page which lists all the subjects
        within that group.
      </BodyText>
      <AboutTitle level={6} title='Viewing subjects' />
      <BodyText>
        Within a group, you will be able to view a list of all subjects that
        have been retired from your project so far. For each group, you will
        be able to see (and sort by!) the following information:
      </BodyText>
      <StyledList>
        <StyledListItem>
          <b>Zooniverse Subject ID</b>: a unique numeric series that is automatically
          assigned to subjects when uploaded to the Zooniverse platform
        </StyledListItem>
        <StyledListItem>
          <b>Internal ID</b>: this will reflect whatever was included in the
          internal_ID column of your manifest
        </StyledListItem>
        <StyledListItem>
          <b>Last edit</b>: a timestamp that shows when the last edit was made
          to a subject in this group
        </StyledListItem>
        <StyledListItem>
          <b>Last editor</b>: the username of whoever made the most recent edit
          to a subject in this group
        </StyledListItem>
        <StyledListItem>
          <b>Status</b>: shows the current state of the subject
          <StyledList>
            <StyledListItem>
              <b>UNSEEN</b> indicates the subject has not yet been opened
            </StyledListItem>
            <StyledListItem>
              <b>IN_PROGRESS</b> indicates the subject has been opened, but has
              not yet been Approved or marked as Ready for Approval
            </StyledListItem>
            <StyledListItem>
              <b>READY</b> indicates the subject has been marked as Ready for
              Approval by an Editor, and requires final Admin approval
            </StyledListItem>
            <StyledListItem>
              <b>APPROVED</b> indicates a subject has been marked as Approved
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>Flag</b>:
          <StyledList>
            <StyledListItem>
              A green dot can be added by Admins or Editors, as a way to mark
              progress when reviewing a document (note: this is not required,
              just an optional tool)
            </StyledListItem>
            <StyledListItem>
              A red flag can be added by Admins or Editors, as a way to signal
              to team members that a line needs additional review
            </StyledListItem>
            <StyledListItem>
              A star next to a transcription indicates that it is a Gold Standard
              transcription, made by someone who is listed as an Expert in the
              Project Builder and had Gold Standard mode enabled when they made
              their transcription
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          <b>Consensus score</b>: a reflection of volunteer agreement for a
          single line of text. The consensus score is the average number of
          volunteers who agreed on the aggregate transcription for this line.
          The value here is presented as [x/y] where x = consensus score and
          y = total number of volunteers who transcribed the line.
        </StyledListItem>
        <StyledListItem>
          <b>Transcribed lines</b>: shows the total number of lines transcribed
          for the subject
        </StyledListItem>
        <StyledListItem>
          <b>Pages</b>: shows the total number of pages for the subject
        </StyledListItem>
      </StyledList>
      <BodyText>
        To view an individual subject, select it from the list. It will open
        in a new browser page, with the original image on the left side and a
        list of line-by-line transcriptions on the right.
      </BodyText>
      <AboutTitle level={6} title='Search' />
      <BodyText>
        Clicking the 'Search' button will open a pop-up module that allows
        you to find a specific subject, as well filter subjects by their status
        or flags. To search for a specific subject, select the ID type (Zooniverse
        ID or Internal ID), enter the name, and click 'Search'. To filter subjects,
        select from the list of options available and click Search. You can
        also <b>Sort</b> any of the lists (Workflows, Groups, Subjects) by
        clicking on the available column headings. Please note that ALICE only
        supports search within individual groups, not across an entire Workflow
        or Project.
      </BodyText>
      <AboutTitle level={6} title='What am I looking at? Images, markings, and transcriptions' />
      <BodyText>
        Clicking on an individual subject will show you the original image on the
        left side of the screen, and a list of transcriptions on the right.
      </BodyText>
      <BodyText>
        The original image will also include different colored lines, which
        represent the aggregated markings made by volunteers in the transcription
        project. Each solid line represents a cluster of individual lines drawn
        by volunteers, which are represented by dotted lines of the same color.
        Circles at the end of each line represent the dots placed by volunteers
        to generate the underline marking. An open circle represents the first
        dot placed by a volunteer; a closed circle represents the second dot.
      </BodyText>
      <BodyText>
        Clicking on a line of text will open a module that allows you to edit
        the selected transcription. Beneath it, you will see a list of individual
        transcriptions submitted by volunteers. For each individual transcription,
        you will see the Zooniverse username of the volunteer who submitted it
        (if they were logged into a Zooniverse account), and the time and date
        the transcription was submitted.
      </BodyText>
      <AboutTitle level={4} title='Editing' />
      <AboutTitle level={6} title='Editing or changing transcriptions' />
      <BodyText>
        The <b>aggregated transcription</b> will be the default selected transcription.
        To change it, select an individual transcription from the list, or write
        your own in the space provided, and click 'Replace with selected'.
        Once a change has been made and the module is closed, the consensus score
        column for that line will read <b>Edited</b>, as it no longer reflects the
        aggregate transcription score. To revert to the aggregated transcription,
        click on the line to reopen the module, select the aggregated transcription
        from the menu, and click 'Replace with selected'.
      </BodyText>
      <AboutTitle level={6} title='Flags' />
      <BodyText>
        Press the green circle to mark the line as <b>seen</b>, or press the red
        flag if the line <b>needs attention</b>. Fellow Admins, Editors, and
        Viewers will be able to see any flags you add to a subject.
      </BodyText>
      <AboutTitle level={6} title='Approving subjects' />
      <BodyText>
        Once a subject has been reviewed and all changes are in place, a subject
        must be marked as Approved in order for the subject to be included in the
        final data export. To mark a subject as Approved, click the ‘Mark as
        Approved’ button at the top of the page. You must have Admin-level access
        to ALICE to approve subjects. Editors are able to request Admin approval
        for subjects by clicking ‘Ready for Review’.
      </BodyText>
      <BodyText>
        When a subject has been approved, no further actions can be taken unless
        the subject is un-approved by an Admin. To un-approve a subject, click
        the 'Approve' button at the top of the page, and confirm you want to
        un-approve. Please note that when a subject has been un-approved, you
        will not be able to request a data export for that subject until it has
        been re-approved.
      </BodyText>
      <AboutTitle level={6} title='Aggregation settings (advanced)' />
      <BodyText>
        The aggregation settings allow you to adjust the way that the raw
        transcriptions are combined together to create aggregated transcriptions.
        To view the aggregation settings for an individual subject, first make
        sure you’re currently viewing that subject in ALICE. Then, choose ‘More’
        in the menu at the top of the page, and select ‘Edit Aggregation Settings’
        from the dropdown menu.
      </BodyText>
      <BodyText>
        Adjusting the aggregation settings may be necessary for a number of
        reasons. For example, if more lines of text are detected than there are
        on the page, this will result in the same transcription appearing twice
        in the viewer. If fewer lines of text are detected than there are on the
        page, multiple lines may be grouped together, resulting in inaccurate
        transcriptions.  Parameter adjustments can be made on a per-subject basis
        in the ALICE interface.
      </BodyText>
    </Box>
  )
}
