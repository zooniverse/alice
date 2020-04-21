import React from 'react'
import { Anchor, Box, Text } from 'grommet'
import styled from 'styled-components'
import contents from '../contents'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const PlainAnchor = styled(Anchor)`
  text-decoration: none;
`

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  div > li:first-child span {
    font-weight: bold
  }

  ul {
    padding-left: 1em
  }
`

const BUFFER = 12

function renderHeaders(content, key, capital = false) {
  const { distinction, title } = content
  const TextComponent = capital ? CapitalText : Text

  return (
    <li>
      <PlainAnchor key={key} href={`#${title}${distinction || ''}`}>
        <TextComponent color='#005D69' weight={300}>{title}</TextComponent>
      </PlainAnchor>
    </li>
  )
}

const ContentsTable = React.forwardRef(function (props, ref) {
  const [contentsHeight, setContentsHeight] = React.useState(0)

  React.useEffect(() => {
    function setHeight() {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const contentHeight = window.innerHeight - rect.height - BUFFER
        setContentsHeight(contentHeight)
      }
    }
    setHeight()

    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [ref])

  return (
    <Box height={`${contentsHeight}px`} pad={{ bottom: 'xsmall' }} overflow='auto'>
      <StyledList>
        {contents.map((content, i) =>
          <Box key={`CONTENT_LIST_${i}`}>
            {renderHeaders(content, `CONTENT_TITLE_${i}`, true)}
            {content.sub && content.sub.map((secondHead, i) =>
              <StyledList key={`CONTENT_SUB_LIST_${i}`}>
                {renderHeaders(secondHead, `CONTENT_TITLE_SUB_${i}`)}
                {secondHead.sub && secondHead.sub.map((thirdHead, i) =>
                  <StyledList key={`CONTENT_SUB_LIST_2_${i}`}>
                    {renderHeaders(thirdHead, `CONTENT_TITLE_SUB_1_${i}`)}
                    {thirdHead.sub && thirdHead.sub.map((fourthHead, i) =>
                      <StyledList key={`CONTENT_SUB_LIST_3_${i}`}>
                        {renderHeaders(fourthHead, `CONTENT_TITLE_SUB_2_${i}`)}
                      </StyledList>
                    )}
                  </StyledList>
                )}
              </StyledList>
            )}
          </Box>
        )}
      </StyledList>
    </Box>
  )
})

export default ContentsTable
