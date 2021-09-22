import { Box, Button, Text } from 'grommet'
import { func, shape, string } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import CONTENT from './content'

const StyledText = styled(Text)`
  line-height: 1.5rem;
`

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

export default function DeletePageModal({ content, onClose, onDelete }) {
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
      width='medium'
    >
      <Box direction='row' gap='small' justify='between'>
        <Text size='large'>{content.title}</Text>
        <Button
          a11yTitle="Close Delete Page Modal"
          icon={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
          onClick={onClose}
          plain
        />
      </Box>

      <StyledText>{content.firstParagraph}</StyledText>
      <StyledText>{content.secondParagraph}</StyledText>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button
          a11yTitle="Close Delete Page Modal"
          label={<Uppercase size='small'>Cancel</Uppercase>}
          onClick={onClose}
          plain
        />
        <Button
          a11yTitle="Delete Selected Page"
          label={<Uppercase size='small'>Yes, Delete</Uppercase>}
          onClick={onDelete}
          plain
        />
      </Box>
    </Box>
  )
}

DeletePageModal.defaultProps = {
  content: CONTENT.withDuplicates,
  onClose: () => {},
  onDelete: () => {}
}

DeletePageModal.propTypes = {
  content: shape({
    title: string,
    firstParagraph: string,
    secondParagraph: string
  }),
  onClose: func,
  onDelete: func
}