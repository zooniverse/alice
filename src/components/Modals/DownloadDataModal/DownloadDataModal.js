import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { bool, func, number } from 'prop-types'

export default function DownloadDataModal({
  approved,
  entireGroup,
  onClose,
  transcriptionCount
}) {
  const text = entireGroup ? 'Download approved subject set data' : 'Download subject data'
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
    >
      <Box direction='row' gap='small' justify='between'>
        <Text size='large'>{text}</Text>
        <Button
          a11yTitle="Close Download Subject Data Modal"
          icon={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
          onClick={onClose}
          plain
        />
      </Box>
      {entireGroup && <Text>{`${approved}/${transcriptionCount} SUBJECTS APPROVED`}</Text>}
      <Text margin={{ top: 'xsmall' }}>Download a .zip file containing:</Text>
      <Box gap='xsmall'>
        <Text size='small'>&#8226; Line by line transcription and metadata (.csv)</Text>
        <Text size='small'>&#8226; Text-only file (.txt)</Text>
        <Text size='small'>&#8226; Raw, unparsed transcription data (.json)</Text>
      </Box>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button
          a11yTitle="Close Download Subject Data Modal"
          label={<Text size='small'>CLOSE</Text>}
          onClick={onClose}
          plain
        />
        <Button
          a11yTitle="Download Subject Data"
          label={<Text size='small'>DOWNLOAD</Text>}
          plain
        />
      </Box>
    </Box>
  )
}

DownloadDataModal.propTypes = {
  approved: number,
  entireGroup: bool,
  onClose: func,
  transcriptionCount: number
}

DownloadDataModal.defaultProps = {
  approved: number,
  entireGroup: false,
  onClose: () => {},
  transcriptionCount: 0
}
