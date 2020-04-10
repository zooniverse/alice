import Create from 'images/about/create.png'
import Register from 'images/about/register.png'
import Workflow1 from 'images/about/workflow1.png'
import Workflow2 from 'images/about/workflow2.png'
import Workflow3 from 'images/about/workflow3.png'
import Workflow4 from 'images/about/workflow4.png'
import Table from 'images/about/table.png'
import Transcription from 'images/about/transcription.png'
import Visibility from 'images/about/visibility.png'
import Projects from 'images/about/projects.png'
import Collaborators from 'images/about/collaborators.png'

const content = [{
    title: '',
    content: [{
        caption: 'The registration button, shown here outlined in red.',
        image: Register,
        text: 'Welcome to **ALICE** the **A**ggregate **L**ine **I**nspector and **C**ollaborative Editor. Alice is a tool for working collaboratively to view and edit the output of text transcription projects on Zooniverse.org. To use this tool, you will need to have an ALICE-compatible transcription project set up in the Zooniverse Project Builder. For instructions on how to make your project ALICE-compatible, read on.'
      },{
        text: 'To build your transcription project, you will need a Zooniverse account. Create your account by visiting https://www.zooniverse.org and clicking **REGISTER**. You only need a name and email address to create an account.'
      },{
        text: 'Once you’ve created your account, read through the Zooniverse documentation and policies at help.zooniverse.org.'
      },{
        image: Create,
        text: 'To create a project, visit https://www.zooniverse.org/lab, sign into your account, and click **Create a new project**.'
      }]
  }, {
    title: 'Setting up your project for use with ALICE',
    content: [{
        caption: 'Series illustrating the process of creating task + sub-task.',
        image: Workflow1,
        text: 'To use ALICE, you will need to set up your transcription project in a specific way. Following these instructions **before** building your workflow(s) in the Zooniverse Project Builder will ensure that your project is compatible with the app, and will allow your team to easily navigate through the ALICE interface.'
      },{
        caption: 'adding a **drawing** task',
        image: Workflow2,
        text: '#### Choosing compatible tools'
      },{
        caption: 'selecting the **line** tool',
        image: Workflow3,
        text: 'ALICE is set up to work with transcription data that is collected using a combination of Drawing Tools and Text Entry Subtasks.'
      },{
        caption: 'selecting the **text** sub-task option',
        image: Workflow4,
        text: 'Please set up your workflow using the **Line Tool** with a **Text Entry Sub-task**.\n * Select **Add A Task > Drawing**\n * In the **Tool Selection Area**, choose **Line** and add a **Text Sub-task** (note: it is okay to use Text Modifiers with ALICE)'
      },{
        caption: 'The line + text sub-task as it appears in the classification interface, for the [my dear Mr. Welles](https://www.zooniverse.org/projects/jmschell/my-dear-mr-welles-war-of-the-worlds-fan-and-hate-mail) project.',
        image: Transcription
      },{
        text: '#### Uploading subjects'
      },{
        text: 'In Zooniverse projects, the data that your volunteers will view and transcribe are known as **Subjects**. Subjects can be a single image or multiple associated images (e.g. a letter).'
      },{
        text: 'In the Project Builder, a group of subjects is known as a **Subject Set**. In ALICE, this grouping cannot be automated, as it is in the Project Builder. We have elected to call these **Groups** to avoid confusion between the ALICE and Project Builder methods.'
      },{
        text: 'The indexing system used in ALICE is: **Project > Workflow > Group > Subject**; in which each item on the list is shown as a different ‘page’. The definitions here map to the Zooniverse terms (see the Zooniverse glossary for more information), with the exception of **Group**, as noted above. '
      },{
        text: 'To add metadata to your subjects, include a **manifest** in your subject upload. The metadata can be accessed by volunteers within Project Builder projects (in the transcription interface), as well as by your collaborators in ALICE (on individual **Subject** pages). For more information about creating a manifest, see the Zooniverse help page.'
      },{
        text: 'To ensure correct indexing within ALICE, **you must include the following information in your manifest:**\n  * A column with the heading **Internal_ID** that contains the unique identifier you plan to use for each subject (note: a subject can be a single image, or multiple images, e.g. a multi-page letter)\n    * Note: ‘Internal’ here refers to YOUR institution! This should be an identifier that is easily recognizable for you and your team\n * A column with the heading **Group_ID** that contains an identifier for subjects that should be grouped together.  The Group_ID can be the Subject Set Name or ID used in the Project Builder, or you can choose another name. The Group ID will be the sub-index for a given workflow\n    * Feel free to group your subjects in whatever way you like, as long as it helps keep your project and data organized. Examples might include:\n      * Author\n      * Date\n      * Topic\n  * Note: these identifiers can be a combination of alphanumeric and special characters, but we recommend using minimal special characters, as they can negatively affect the Search and Sort functions\n  * Remember: you can’t change your groups once you’ve uploaded your subjects to the Project Builder, so be sure you’ve given some thought to the way they’re organized'
      },{
        caption: 'An example of an image manifest. The columns outlined in red represent the information required for ALICE compatibility.',
        image: Table,
        text: '**Metadata visibility**: any fields in your manifest with names that begin with “#” or “//” will never be shown to volunteers in your transcription project interface, or the corresponding Talk discussion boards. Any fields with names that begin with "!" will not be accessible to volunteers in the transcription interface, but will be available on Talk after classification. Information in fields that don’t begin with a “#”, “//”, or "!" will always be accessible to volunteers in both the transcription interface and Talk. '
      },{
        text: 'The metadata that you upload for your subjects will vary from project to project. The image above shows a basic example of the necessary column headings for successful ALICE indexing.'
      },{
        text: '#### Reaching out to complete your setup'
      },{
        text: 'Once your project and workflows have been created, subjects with appropriate metadata uploaded to the Project Builder, and you have applied for beta review, you must reach out to the Zooniverse team so we can configure the accompanying Caesar classification processing workflows and complete your setup, to ensure that retired subjects will be sent to ALICE. To do so, **please email** contact@zooniverse.org **with the subject line “ALICE setup”**, and include the following information:\n  * The project number (found at the top left of the Project Builder interface)\n  * The workflow number(s) for **all workflows** that will produce data that  you want to appear in ALICE\n  * Confirmation that you have requested beta review*\n  * Any additional questions you may have about setting up your project with ALICE'
      },{
        text: 'Please note that failure to reach out to the Zooniverse team for this final step will result in your project not being compatible for use with ALICE.'
      },{
        caption: 'The Visibility tab of the Project Builder interface, where teams can request beta review.',
        image: Visibility,
        text: '***Note**: ALICE setup will not be completed until after you have applied for beta review, which can be done through the Visibility tab of the Project Builder.'
      }]
  },{
    title: 'Using ALICE with your team',
    content: [{
      text: 'Once you have finished building your project and the Zooniverse team has completed the setup, ALICE will be ready for use.'
    },{
      text: '#### Logging into ALICE and finding your project'
    },{
      image: Projects,
      text: 'Visit https://alice.zooniverse.org and log in with your Zooniverse username and password. Once logged in, you will see a list of your ALICE-compatible Zooniverse projects, and your designated role on each (Admin, Editor, or Viewer). Click on a project to get started.'
    },{
      text: '#### Adding team members & levels of access'
    },{
      caption: 'The Collaborators tab of the Project Builder interface, where project team members can be added in various roles.',
      image: Collaborators,
      text: 'To grant your team members access to ALICE, they will need individual Zooniverse accounts. Each username must be added to the project under the Collaborators tab within the Zooniverse Project Builder interface.'
    },{
      text: 'The Project Builder roles determine what level of access your team members will have in ALICE.'
    },{
      text: '**Admin** access: Project owner, Collaborator'
    },{
      text: 'Admins have full access to all features of ALICE. Admins are able to do the following:\n  * View subjects\n  * Edit Subjects\n  * Mark subjects as Approved\n  * Download subject data'
    },{
      text: '**Editor** access: Expert, Researcher, Moderator'
    },{
      text: 'Editors are able to use all ALICE features except Approve subjects. Instead, Editors are able to submit subjects for approval by an Admin. Editors are able to do the following:\n  * View subjects\n  * Edit subjects\n  * Submit subjects for Approval by Admins\n  * Download subject data'
    },{
      text: '**Viewer** access: Tester'
    },{
      text: 'Viewers are able to do the following:\n  * View subjects'
    },{
      text: '#### Viewing'
    },{
      text: '*Viewing workflows*'
    },{
      text: 'Once you’ve selected your project from the list on the ALICE homepage, you will see a list of all ALICE-compatible **workflows** for that project, as well as information about their corresponding **workflow ID**, the number of **groups** within the workflow, and total number of **subjects**.'
    },{
      text: 'Please note that data from any additional project workflows which are not ALICE-compatible will not be shown in this list. To access results from those workflows, download your project data export from the Project Builder.'
    },{
      text: '*Viewing groups*'
    },{
      text: 'When you select a workflow from the list, you will be taken to a new page that shows a list of the groups within that particular workflow, their corresponding **group ID**, and a timestamp of when the last edit was made to a subject within that group.'
    },{
      text: 'Selecting a group will open a new page which lists all the subjects within that group.'
    },{
      text: '*Viewing subjects*'
    },{
      text: 'Within a group, you will be able to view a list of all subjects that have been retired from your project so far. For each subject, you will be able to see (and sort by!) the following information:\n  * **Zooniverse Subject ID**: a unique numeric series that is automatically assigned to subjects when uploaded to the Zooniverse platform\n  * **Internal ID**: this will reflect whatever was included in the internal_ID column of your manifest\n  * **Last edit**: a timestamp that shows when the last edit was made to a subject in this group\n  * **Last editor**: the username of whoever made the most recent edit to a subject in this group\n  * **Status**: shows the current state of the subject\n    * **UNSEEN** indicates the subject has not yet been opened\n    * **IN_PROGRESS indicates the subject has been opened, but has not yet been Approved or marked as Ready for Approval**\n    * **READY** indicates the subject has been marked as Ready for Approval by an Editor, and requires final Admin approval\n    * **APPROVED** indicates a subject has been marked as Approved\n  * **Flag**\n    * A green dot can be added by Admins or Editors, as a way to mark progress when reviewing a document (note: this is not required, just an optional tool)\n    * A red flag can be added by Admins or Editors, as a way to signal to team members that a line needs additional review\n    * A star next to a transcription indicates that it is a Gold Standard transcription, made by someone who is listed as an Expert in the Project Builder and had Gold Standard mode enabled when they made their transcription\n  * **Consensus score**: a reflection of volunteer agreement for a single line of text. The consensus score is the average number of volunteers who agreed on the aggregate transcription for this line. The value here is presented as [x/y] where x = consensus score and y = total number of volunteers who transcribed the line.\n  * **Transcribed lines**: shows the total number of lines transcribed for the subject\n  * **Pages**: shows the total number of pages for the subject'
    },{
      text: 'To view an individual subject, select it from the list. It will open in a new browser page, with the original image on the left side and a list of line-by-line transcriptions on the right.'
    },{
      text: '*Search*'
    },{
      text: 'Clicking the **Search** button will open a pop-up module that allows you to find a specific subject, as well filter subjects by their status or flags. To search for a specific subject, select the ID type (Zooniverse ID or Internal ID), enter the name, and click Search. To filter subjects, select from the list of options available and click Search. You can also **Sort** any of the lists (Workflows, Groups, Subjects) by clicking on the available column headings.'
    },{
      text: '*What am I looking at? Images, markings, and transcriptions*'
    },{
      caption: 'example of subject view',
      text: 'Clicking on an individual subject will show you the original image on the left side of the screen, and a list of transcriptions on the right.'
    },{
      caption: 'example of solid + dotted lines w/in interface',
      text: 'The original image will also include different colored lines, which represent the aggregated markings made by volunteers in the transcription project. Each solid line represents a cluster of individual lines drawn by volunteers, which are represented by dotted lines of the same color.'
    },{
      caption: 'example of transcription module',
      text: 'Clicking on a line of text will open a module that allows you to edit the selected transcription. Beneath it, you will see a list of individual transcriptions submitted by volunteers. For each individual transcription, you will see the Zooniverse username of the volunteer who submitted it (if they are logged into a Zooniverse account), and the time and date the transcription was submitted.'
    },{
      text: '#### Editing'
    },{
      text: '*Editing or changing transcriptions*'
    },{
      text: 'The **aggregated transcription** will be the default selected transcription. To change it, select an individual transcription from the list, or write your own in the space provided, and click **Replace with selected**. Once a change has been made and the module is closed, the consensus score column for that line will read **Edited**, as it no longer reflects the aggregate transcription score. To revert to the aggregated transcription, click on the line to reopen the module, select the aggregated transcription from the menu, and click **Replace with selected**.'
    },{
      text: '*Flags*'
    },{
      text: 'Press the green circle to mark the line as **seen**, or press the red flag if the line **needs attention**. Fellow Admins, Editors, and Viewers will be able to see any flags you add to a subject.'
    },{
      text: '*Approving subjects*'
    },{
      text: 'Once a subject has been reviewed and all changes are in place, a subject must be marked as Approved in order for the subject to be included in the final data export. To mark a subject as Approved, click the ‘Mark as Approved’ button at the top of the page. You must have Admin-level access to ALICE to approve subjects. Editors are able to request Admin approval for subjects by clicking ‘Ready for Review’.'
    },{
      text: 'When a subject has been approved, no further actions can be taken unless the subject is un-approved by an Admin. To un-approve a subject, click the Approve button at the top of the page, and confirm you want to un-approve. Please note that when a subject has been un-approved, you will not be able to request a data export for that subject until it has been re-approved.'
    },{
      text: '#### Aggregation settings (advanced)'
    },{
      text: 'The aggregation settings allow you to adjust the way that the raw transcriptions are combined together to create aggregated transcriptions. To view the aggregation settings for an individual subject, first make sure you’re currently viewing that subject in ALICE. Then, choose ‘More’ in the menu at the top of the page, and select ‘Edit Aggregation Settings’ from the dropdown menu.'
    },{
      text: 'Adjusting the aggregation settings may be necessary for a number of reasons. For example, if more lines of text are detected than there are on the page, this will result in the same transcription appearing twice in the viewer. If fewer lines of text are detected than there are on the page, multiple lines may be grouped together, resulting in inaccurate transcriptions.  Parameter adjustments can be made on a per-subject basis in the ALICE interface.'
    }]
  },{
    title: 'Optics',
    content: [{
      text: 'This process is designed to aggregate text that has been transcribed line-by-line (i.e. each submitted transcription contains a full line of text). This method is based on the OPTICS algorithm for finding clusters within data.'
    },{
      text: 'Adjustable parameters\n  * **min_samples** This represents the smallest number of transcribed lines needed to form a cluster (the solid colored markings on the images). Increase the value if a single line of text is being identified multiple times, decrease the value if multiple lines are being clustered together.\n    * Data type = Integer greater than **2** or the string **auto**\n    * Unit = None\n    * Default value = **auto**\n  * **xi** This determines the minimum steepness on the reachability plot that constitutes a cluster boundary. Increase the value if a single line of text is being identified multiple times, decrease the value if multiple lines are being clustered together.  In most cases changing min_samples should be enough; only change this value for fine-tuning the clustering.\n    * Data type = Float between **0** and **1**\n    * Unit = None\n    * Default value = **0.05**\n  * **angle_eps** This represents how close the angle (in degrees) of two lines need to be in order to be placed in the same angle cluster. Editing this value will only change the reading order of the transcribed lines.\n    * Data type = Float between **0** and **180**\n    * Unit = Degrees\n    * Default value = **30**\n  * **gutter_eps** This represents how close the ‘x’ position (in image pixels) of the start of two lines need to be in order to be placed in the same column cluster. Editing this value will only change the reading order. E.g. if the subject contains indentation for the first line of a paragraph this should be set to at least the saze (in pixels) of that indentation.\n    * Data type = Float greater than **0**\n    * Unit = Pixels\n    * Default value = **150**\n  * **min_line_length** This represents the minimum length (in image pixels) a transcribed line of text needs to be in order to be considered valid. Editing this value will filter out short lines that were drawn but did not correspond to any text on the image.\n    * Data type = Float greater than **0**\n    * Unit = Pixels\n    * Default value = **0**'
    }]
  },{
    title: 'DBSCAN',
    content: [{
      text: 'This process is designed to aggregate text that has been transcribed word-by-word (i.e. one submitted transcription may contain a full line of text, while others include only single words from the same line, with the intent that each will be properly combined). This method is based on the DBSCAN algorithm for finding clusters within data.'
    },{
      text: 'Adjustable parameters\n  * **eps_slope** This represents how close the angle (in degrees) of two lines need to be in order to be placed in the same angle cluster. Increase this value if too many angle clusters are found, decrease it if there are too few.\n    * Data type = Float between **0** and **180**\n    * Unit = Degrees\n    * Default value = **25**\n  * **eps_line** This represents how close vertically (in image pixels) two lines need to be in order to be identified as the same line. Increase this number if a single line of text is being identified multiple times, decrease it if multiple lines of text are being clustered together.\n    * Date type= Float greater than **0**\n    * Unit = Pixels\n    * Default value = **40**\n  * **eps_word** This represents how close horizontally (in image pixels) the end points of a line need to be in order to be identified as a single point.\n    * Data type = Float greater than **0**\n    * Unit = Pixels\n    * Default value = **40**\n  * **gutter_tol** This represents how much neighboring columns can overlap horizontally (in image pixels) and still be identified as multiple columns. Increase this value if neighboring columns of text are not being separated as multiple columns. This will only work if there are no annotations that bridge the gap between the columns.\n    * Data type = Float greater than **0**\n    * Unit = Pixels\n    * Default value = **0**\n  * **min_samples**: This represents how many transcribed lines need to be close together to form a cluster (the solid colored markings on the images)..  Set this to 1 for all annotations to be kept.  Increase this value to remove outlier annotations from the aggregation.\n    * Data type = Integer greater than or equal to **1**\n    * Unit = None\n    * Default value = **1**\n  * **min_word_count** This represents the minimum number of times a word must be identified for it to be kept in the aggregate transcription. Increasing this number will only keep high consensus words in the final text.\n    * Data type = Integer greater than or equal to **1**\n    * Unit = None\n    * Default value = **1**'
    },{
      text: '#### Data exports'
    },{
      text: 'You can download data exports for individual subjects, or for all approved subjects within a group.'
    },{
      text: 'To download the data export for an individual subject, first make sure you’re viewing that subject in ALICE and that the subject is approved. Then, choose ‘More’ in the menu at the top of the page, and select ‘Download Subject Data’ from the dropdown menu.'
    },{
      text: 'To download a data export for all approved subjects in a group, first make sure you’re viewing the list of subjects within that group. Then, click ‘Download Approved Group Data’ at the top of the page.'
    },{
      text: 'Data exports will only become available when a subject has been Approved. Marking a subject as ‘Approved’ will allow the ability to generate a data export. All data exports are made up of the following three files:\n  * A data table with the metadata created in the app (.csv)\n  * A file with the selected transcription only (.txt)\n  * Raw, unparsed transcription data (.json)'
    }]
  }
]

export default content;
