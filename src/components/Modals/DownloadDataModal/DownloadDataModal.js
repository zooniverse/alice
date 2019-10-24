import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func } from 'prop-types'

export default function DownloadDataModal({ onClose }) {
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
        <Button
          icon={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
          onClick={onClose}
          plain
        />
      </Box>
      <Text>Download a .zip file containing:</Text>
      <Box gap='xsmall'>
        <Text size='small'>&#8226; Line by line transcription and metadata (.csv)</Text>
        <Text size='small'>&#8226; Text-only file (.txt)</Text>
        <Text size='small'>&#8226; Raw, unparsed transcription data (.json)</Text>
      </Box>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button label={<Text size='small'>CLOSE</Text>} onClick={onClose} plain />
        <Button label={<Text size='small'>DOWNLOAD</Text>} plain />
      </Box>
    </Box>
  )
}

DownloadDataModal.propTypes = {
  onClose: func
}

DownloadDataModal.defaultProps = {
  onClose: () => {}
}
