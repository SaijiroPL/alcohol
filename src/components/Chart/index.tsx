import React from 'react'

import { chart, man, manYellow } from 'const/icons'
import * as Colors from 'const/colors'
import './styles.css';

interface props {
  rank?: number
  volume?: number
  rank2?: number
  volume2?: number
}

export default function({
  rank,
  rank2,
  volume,
  volume2,
}: props) {
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
            <img src={man} alt='man' style={{
              position: 'absolute', right: (rank * 3 - 28) + 'px', bottom: (40 - rank * 0.13) + 'px'
            }} />
            <span style={{
              position: 'absolute', right: 0, bottom: '40px', 
              display: 'inline-block', marginRight: '-6px', 
              color: 'black', fontSize: '22px', fontWeight: 'bold'
            }}>1位</span>
            {!rank2 && (
              <span style={{
                position: 'absolute', left: 0, bottom: '24px', 
                display: 'inline-block', marginLeft: '-20px', 
                color: '#DEED15', fontSize: '22px', fontWeight: 'bold'
              }}>100位</span>
            )}
            <span style={{
              position: 'absolute', right: (rank * 3 - (volume >= 10 ? 24 : 16)) + 'px', bottom: '-24px', 
              display: 'inline-block', marginLeft: '-20px', 
              color: Colors.RED, fontSize: '22px', fontWeight: 'bold'
            }}>{volume}g</span>  
          </>
        )}
        {volume2 !== undefined && rank2 !== undefined && (
          <span style={{
            position: 'absolute', right: (rank2 * 3 - (volume2 >= 10 ? 24 : 16)) + 'px', bottom: '-24px', 
            display: 'inline-block', marginLeft: '-20px', 
            color: Colors.RED, fontSize: '22px', fontWeight: 'bold'
          }}>{volume2}g</span>
        )}
        {rank2 !== undefined && (
          <div style={{
            width: '2px', height: '37px',
            backgroundColor: 'white',
            position: 'absolute', right: rank2 * 3 + 'px', bottom: '0'
          }} />
        )}
        {rank2 !== undefined && (
          <img src={manYellow} alt='man' style={{
            position: 'absolute', right: (rank2 * 3 - 18) + 'px', bottom: (40 - rank2 * 0.13) + 'px'
          }} />
        )}
      </div>
    </div>
    
  )
}