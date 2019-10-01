import React from 'react'
import { Box, Button, Text } from 'grommet'

export default function DropContent({ items, onClose }) {
  return (
    <Box>
      {items.map((item, i) => {
        return (
          <Button
            key={`${item.label}_${i}`}
            label={<Text>{item.label}</Text>}
            onClick={() => {
              item.onClick()
              onClose()
            }}
            plain
          />
      )})}
    </Box>
  )
}
