import React from 'react'
import { Anchor, Box } from 'grommet'
import AboutTitle from './components/AboutTitle'
import PhotoBlock from './components/PhotoBlock'
import { BodyText, StyledList, StyledListItem } from './components/Styled'
import Manifest from 'images/about/table.png'
import Transcription from 'images/about/transcription.png'
import Visibility from 'images/about/visibility.png'
import Workflow1 from 'images/about/workflow1.png'
import Workflow2 from 'images/about/workflow2.png'
import Workflow3 from 'images/about/workflow3.png'
import Workflow4 from 'images/about/workflow4.png'

const CAPTION = `
  Series illustrating the process of creating task + sub-task. Top left: adding
  a Drawing task; Top right: selecting the Line tool; Bottom left:
  adding a Sub-task; Bottom right: selecting the Text sub-task option.
`

const CAPTION_2 = `
  The Line + Text Sub-task as it appears in the classification interface, for
  the [My Dear Mr. Welles](https://www.zooniverse.org/projects/jmschell/my-dear-mr-welles-war-of-the-worlds-fan-and-hate-mail) project.
`

const CAPTION_3 = `
  An example of an image manifest. The columns outlined in red represent the
  information required for ALICE compatibility.
`

const CAPTION_4 = `
  The Visibility tab of the Project Builder interface, where teams can request beta review.
`

const PHOTOS = [
  { alt: 'adding a Drawing task', photo: Workflow1 },
  { alt: 'selecting the Line tool', photo: Workflow2 },
  { alt: 'adding a Sub-task', photo: Workflow3 },
  { alt: 'selecting the Text sub-task option', photo: Workflow4 }
]

export default function Setup() {
  return (
    <Box gap='xsmall'>
      <AboutTitle title='Setting up your project for use with ALICE' />
      <BodyText>
        To use ALICE, you will need to set up your transcription project in a
        specific way. Following these instructions <b>before</b> building your
        workflow(s) in the Zooniverse Project Builder will ensure that your
        project is compatible with the app, and will allow your team to easily
        navigate through the ALICE interface.
      </BodyText>
      <AboutTitle level={4} title='Choosing compatible tools' />
      <BodyText>
        ALICE is set up to work with transcription data that is collected using
        a combination of Drawing Tools and Text Entry Subtasks. It is okay to 
        use Text Modifiers with ALICE.
      </BodyText>
       <BodyText>
        Please set up your workflow using the Transcription Task (recommended). 
        Note: if the Transcription Task does not appear in your task list, you 
        will need to follow the instructions via  
          <Anchor
            href='https://docs.google.com/document/d/1XpoMC8SBYVCie9mjU_ZBuT3dLR4bWTN-eZE5lHvls2U/edit?usp=sharing'
            label='this link'
            margin={{ left: '0.2em' }}
          />
        to request that the Transcription Task be added to your project.
      </BodyText>
      <StyledList>
        <StyledListItem>Select 'Add A Task' > 'Transcription'</StyledListItem>
        <StyledListItem>
          The transcription task includes a pre-configured drawing task wiht a text
          sub-task, as well as a question task that is used to measure subject
          completeness. Only the instructions, help text, and text modifiers are
          editable.
        </StyledListItem>
      </StyledList>
      <BodyText>
        If you do not wish to use the Transcription Task, you can also set up 
        your workflow using the Line Tool with a Text Entry Sub-task.
      </BodyText>
      <StyledList>
        <StyledListItem>Select 'Add A Task' > 'Drawing'</StyledListItem>
        <StyledListItem>
          In the Tool Selection Area, choose 'Line' and add a 'Text
          Sub-task' 
        </StyledListItem>
      </StyledList>
      <PhotoBlock
        caption={CAPTION}
        description='WORKFLOW'
        photos={PHOTOS}
      />
      <PhotoBlock
        caption={CAPTION_2}
        description='TRANSCRIPTION'
        photos={[{ alt: 'The Line + Text Sub-task as it appears in the classification interface', photo: Transcription }]}
      />
      <AboutTitle level={4} title='Uploading subjects' />
      <BodyText>
        In Zooniverse projects, the data that your volunteers will view and
        transcribe are known as <b>Subjects</b>. Subjects can be a single image or
        multiple associated images (e.g. a letter).
      </BodyText>
      <BodyText>
        In the Project Builder, a group of subjects is known as a <b>Subject Set</b>.
        In ALICE, this grouping cannot be automated, as it is in the Project Builder.
        We have elected to call these <b>Groups</b> to avoid confusion between
        the ALICE and Project Builder methods.
      </BodyText>
      <BodyText>
        The indexing system used in ALICE is: <b>Project > Workflow > Group > Subject</b>;
        in which each item on the list is shown as a different ‘page’. The
        definitions here map to the Zooniverse terms (see the Zooniverse glossary
        for more information), with the exception of <b>Group</b>, as noted above.
      </BodyText>
      <BodyText>
        To add metadata to your subjects, include a manifest in your subject
        upload. The metadata can be accessed by volunteers within Project Builder
        projects (in the transcription interface), as well as by your collaborators
        in ALICE (on individual Subject pages). For more information about
        creating a manifest, see the
        <Anchor
          href='https://help.zooniverse.org/getting-started/example/#details-subject-sets-and-manifest-details-aka-what-is-a-manifest'
          label='Zooniverse help page.'
          margin={{ left: '0.2em' }}
        />
      </BodyText>
      <BodyText>
        To ensure correct indexing within ALICE, you must include the following
        information in your manifest:
      </BodyText>
      <StyledList>
        <StyledListItem>
          A column with the heading <b>internal_id</b> that contains the unique identifier
          you plan to use for each subject (note: a subject can be a single image,
          or multiple images, e.g. a multi-page letter)
          <StyledList>
            <StyledListItem>
              Note: ‘Internal’ here refers to YOUR institution! This should be an
              identifier that is easily recognizable for you and your team
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          A column with the heading <b>group_id</b> that contains an identifier
          for subjects that should be grouped together.  The group_id can be the
          Subject Set Name or ID used in the Project Builder, or you can choose
          another name. The group_id will be the sub-index for a given workflow
          <StyledList>
            <StyledListItem>
              Feel free to group your subjects in whatever way you like, as long
              as it helps keep your project and data organized. Examples might include:
              <StyledList>
                <StyledListItem>Author</StyledListItem>
                <StyledListItem>Date</StyledListItem>
                <StyledListItem>Topic</StyledListItem>
              </StyledList>
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          Please limit your unique identifier fields (<b>internal_id</b> and
          <b>group_id</b>) to alphanumeric characters only, and remove spaces, as
          special characters can negatively impact the process of importing data
          into ALICE.                                            
        </StyledListItem>
        <StyledListItem>
          Remember: you can’t change your groups once you’ve uploaded your
          subjects to the Project Builder, so be sure you’ve given some thought
          to the way they’re organized
        </StyledListItem>
      </StyledList>
      <BodyText>
        <b>Metadata visibility</b>: any fields in your manifest with names that
        begin with “#” or “//” will never be shown to volunteers in your transcription
        project interface, or the corresponding Talk discussion boards. Any fields
        with names that begin with "!" will not be accessible to volunteers in
        the transcription interface, but will be available on Talk after classification.
        Information in fields that don’t begin with a “#”, “//”, or '!' will always
        be accessible to volunteers in both the transcription interface and Talk.
      </BodyText>
      <PhotoBlock
        caption={CAPTION_3}
        description='MANIFEST'
        photos={[{ alt: 'An example of an image manifest.', photo: Manifest }]}
      />
      <BodyText>
        The metadata that you upload for your subjects will vary from project
        to project. The image above shows a basic example of the necessary column
        headings for successful ALICE indexing. For an additional example of an
        ALICE-compliant manifest, 
        <Anchor
          href='https://docs.google.com/spreadsheets/d/1x5RtFjpkSnTfm9IMgMd5BWalmEvcd8sESqXGnt6ItEA/edit?usp=sharing'
          label='click here'
          margin={{ horizontal: '0.2em' }}
        />  
      </BodyText>
      <AboutTitle level={4} title='Reaching out to complete your setup' />
      <BodyText>
        Once your project and workflows have been created, subjects with appropriate
        metadata uploaded to the Project Builder, and you have applied for beta
        review, you must reach out to the Zooniverse team so we can configure the
        accompanying Caesar classification processing workflows and complete your
        setup, to ensure that retired subjects will be sent to ALICE. To do so, <b>please email</b>
        <Anchor
          href='mailto:contact@zooniverse.com'
          label='contact@zooniverse.org'
          margin={{ horizontal: '0.2em' }}
        />
        <b>with the subject line “ALICE setup”</b>, and include the following
        information:
      </BodyText>
      <StyledList>
        <StyledListItem>
          The project number (found at the top left of the Project Builder interface)
        </StyledListItem>
        <StyledListItem>
          The workflow number(s) for <b>all workflows</b> that will produce data
          that you want to appear in ALICE
        </StyledListItem>
        <StyledListItem>
          Confirmation that you have requested beta review*
        </StyledListItem>
        <StyledListItem>
          Any additional questions you may have about setting up your project with ALICE
        </StyledListItem>
      </StyledList>
      <BodyText>
        Please note that failure to reach out to the Zooniverse team for this final
        step will result in your project not being compatible for use with ALICE.
      </BodyText>
      <BodyText>
        <b>*Note:</b> ALICE setup will not be completed until after you have applied
        for beta review, which can be done through the Visibility tab of the Project
        Builder.
      </BodyText>
      <PhotoBlock
        caption={CAPTION_4}
        description='VISIBILITY'
        photos={[{ alt: 'The Visibility tab of the Project Builder interface', photo: Visibility }]}
      />
    </Box>
  )
}
