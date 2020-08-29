import React, { useMemo } from 'react'

import { chart, man, face } from 'const/icons'
import * as Colors from 'const/colors'
import './styles.css';

interface props {
  rank?: number
  volume?: number
  rank2?: number
  volume2?: number
}

const iconSize = [
  {width: 33, height: 66},
  {width: 42, height: 47},
  {width: 52, height: 30},
  {width: 54, height: 23}
]

const gramColors = [
  Colors.BLACK,
  Colors.GREEN,
  Colors.RED,
  Colors.BLACK
]

export default function({
  rank,
  rank2,
  volume,
  volume2,
}: props) {
  const rankGroup = useMemo(() => rank ? Math.floor((100 - rank) / 25) : 0, [rank])
  const rankGroup2 = useMemo(() => rank2 ? Math.floor((100 - rank2) / 25) : 0, [rank2])
  const manLeft = useMemo(() => rank ? (rank * 3 - 28) : 0, [rank])
  const manLeft2 = useMemo(() => rank2 ? (rank2 * 3 - 28) : 0, [rank2])
  return (
    <div className='ac-chart-container'>
      <div style={{
        width: '300px',
        margin: '60px auto 0',
        position: 'relative',
      }}>
        <img src={chart} alt='chart' />
        {rank !== undefined && volume !== undefined && (
          <>
            <div style={{
              width: '2px', height: '37px',
              backgroundColor: 'white',
              position: 'absolute', right: rank * 3 + 'px', bottom: '0'
            }} />
            <img src={man[rankGroup]} alt='man' style={{
              position: 'absolute', 
              right: manLeft + 'px', 
              bottom: (40 - rank * 0.13) + 'px', 
              width: iconSize[rankGroup].width, 
              height: iconSize[rankGroup].height
            }} />
            <span style={{
              position: 'absolute', 
              right: (rank * 3 - (volume >= 10 ? 24 : 16)) + 'px', 
              bottom: '-24px', 
              display: 'inline-block', 
              marginLeft: '-20px', 
              color: gramColors[rankGroup], 
              fontSize: '22px', 
              fontWeight: 'bold'
            }}>{Math.round(volume)}g</span>  
          </>
        )}
        {volume2 !== undefined && rank2 !== undefined && (
          <span style={{
            position: 'absolute', 
            right: Math.abs(manLeft - manLeft2) < 45 && rankGroup === rankGroup2 ? 
              (manLeft > manLeft2 ? manLeft - 45 : manLeft + 45) + 'px' : 
              (rank2 * 3 - (volume2 >= 10 ? 24 : 16)) + 'px', 
            bottom: '-24px', 
            display: 'inline-block', 
            marginLeft: '-20px', 
            color: gramColors[rankGroup2], 
            fontSize: '22px', 
            fontWeight: 'bold'
          }}>{Math.round(volume2)}g</span>
        )}
        {rank2 !== undefined && (
          <div style={{
            width: '2px', height: (40 - rank2 * 0.13) + 'px',
            backgroundColor: 'white',
            position: 'absolute', right: rank2 * 3 + 'px', 
            bottom: '0'
          }} />
        )}
        {rank2 !== undefined && (
          <img src={man[rankGroup2]} alt='man' style={{
            position: 'absolute', 
            right: manLeft2 + 'px', 
            bottom: (40 - rank2 * 0.13) + 'px', 
            width: iconSize[rankGroup2].width, 
            height: iconSize[rankGroup2].height,
            display: Math.abs(manLeft - manLeft2) < 45 && rankGroup === rankGroup2 ? 'none' : 'block'
          }} />
        )}
      </div>
    </div>
    
  )
}