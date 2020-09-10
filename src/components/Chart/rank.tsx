import React from 'react'

import * as Colors from 'const/colors'
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
  Colors.RED,
  Colors.GREEN,
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
  const rankLevel = React.useMemo(() => Math.min(Math.floor(rank / 25), 3), [rank])
  return (
    <div style={{
      display: 'inline-flex'
    }}>
      <div style={{
        width: style.radius * 2 + 'px', height: style.radius * 2 + 'px',
        backgroundColor: backColors[rankLevel], color: textColors[rankLevel],
        borderRadius: '50%',
        textAlign: 'center'
      }}>
        <span 
          className='font-fira' 
          style={{ 
            fontSize: style.fontSizeUp, 
            borderBottom: '2px solid ' + textColors[rankLevel],
            fontWeight: 'bold',
            display: 'inline-block',
            marginTop: style.radius / 10 + 'px'
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
        color: backColors[rankLevel],
        fontWeight: 'bold',
        display: 'flex',
        marginLeft: '-' + (style.radius / 12) + 'px'
      }}> <span style={{ alignSelf: 'flex-end' }}>位</span> </div>
    </div>
  )
}