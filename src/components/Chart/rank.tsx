import React from 'react'

import './styles.css';

interface props {
  rank: number
  style: {
    radius: number
    fontSizeUp: string
    fontSizeDown: string
  }
}

const backColors = [
  '#000',
  '#993333',
  '#376B6D',
  '#DEED15'
]

const textColors = [
  '#FFF',
  '#FFF',
  '#FFF',
  '#000'
]

export default function({
  rank,
  style
}: props) {
  return (
    <div style={{
      display: 'inline-flex'
    }}>
      <div style={{
        width: style.radius * 2 + 'px', height: style.radius * 2 + 'px',
        backgroundColor: backColors[Math.floor(rank / 25)], color: textColors[Math.floor(rank / 25)],
        borderRadius: '50%',
        textAlign: 'center'
      }}>
        <span 
          className='font-hira' 
          style={{ 
            fontSize: style.fontSizeUp, 
            borderBottom: '2px solid ' + textColors[Math.floor(rank / 25)],
            fontWeight: 'bold',
            display: 'inline-block',
            marginTop: style.radius / 5 + 'px'
          }}>
          {rank}
        </span>
        <br/>
        <span style={{
          fontSize: style.fontSizeDown,
          fontWeight: 'bold',
          display: 'inline-block',
          marginTop: '5px'
        }}>
          100
        </span>
      </div>
      <div style={{
        fontSize: '28px',
        color: backColors[Math.floor(rank / 25)],
        fontWeight: 'bold',
        display: 'flex',
        marginLeft: '-' + (style.radius / 12) + 'px'
      }}> <span style={{ alignSelf: 'flex-end' }}>位</span> </div>
    </div>
  )
}