import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function DownloadDataModal() {
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
      width='medium'
    >
      <Box direction='row' justify='between'>
        <Text size='large'>Download subject data</Text>
        <FontAwesomeIcon icon={faTimesCircle} size='xs' />
      </Box>
      <Text>Download a .zip file containing:</Text>
      <Box gap='xsmall'>
        <Text size='small'>&#8226; Line by line transcription and metadata (.csv)</Text>
        <Text size='small'>&#8226; Text-only file (.txt)</Text>
        <Text size='small'>&#8226; Raw, unparsed transcription data (.json)</Text>
      </Box>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button label={<Text size='small'>CLOSE</Text>} plain />
        <Button label={<Text size='small'>DOWNLOAD</Text>} plain />
      </Box>
    </Box>
  )
}
