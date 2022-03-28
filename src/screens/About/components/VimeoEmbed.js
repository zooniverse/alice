import React from 'react'
import { string } from 'prop-types'

export default function VimeoEmbed({ src, title }) {
  return (
    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <iframe
        src={src}
        frameBorder='0'
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        title={title}
      />
    </div>
  )
}

VimeoEmbed.propTypes = {
  src: string.isRequired,
  title: string.isRequired
}
