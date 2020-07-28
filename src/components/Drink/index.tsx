import React from 'react';

import Spinner from 'components/Spinner'
import './styles.css';

interface props {
  icon: string
  type: string
  subType?: string
  percent: number
  volume1: number | string
  volume2?: number
  unit: string
}

export default function Drink({
  icon,
  type,
  subType,
  percent,
  volume1,
  volume2,
  unit
}: props) {
  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
        <div className='ac-drink-type'>{type}</div>
        <div className='ac-drink-subtype'>{subType}</div>
        <div className='ac-drink-percent'><span className='ac-drink-percent-number'>{percent}</span>%</div>
      </div>
      <div className='ac-drink-unit-container'>
        <div style={{ display: 'flex' }}>
          <div className='ac-drink-volume'>
            <span className='ac-drink-volume-span'>{volume1}{(typeof(volume1) === 'number') && ('ml')}</span>
          </div>
          <Spinner value={0} suffix={unit} />
        </div>
        {volume2 && (
          <div style={{ display: 'flex' }}>
            <div className='ac-drink-volume'>{volume2}ml</div>
            <Spinner value={0} suffix={unit} />
          </div>
        )}
      </div>
    </div>
  )
}
