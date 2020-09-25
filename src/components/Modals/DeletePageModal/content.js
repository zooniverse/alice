const content = {
  withDuplicates: {
    title: 'Delete this page?',
    firstParagraph: 'The selected page contains transcribed text data. Are you sure you want to delete it?',
    secondParagraph: 'This action can be undone using the Undo button in the toolbar.'
  },
  withoutDuplicates: {
    title: 'Delete contents of this page?',
    firstParagraph: `
      The selected page contains transcribed text data. Are you sure you want to delete these transcriptions?
      Deleting a frame removes associated contents only; non-duplicate images cannot be removed.
    `,
    secondParagraph: 'This action can be undone using the Undo button in the toolbar.'
  }
}

export default content