import React from 'react';

import DropDown from 'components/DropDown'
import { StandardDrinkInfo, DrinkVolume } from 'types/drinks'
import './styles.css';

interface props {
  info: StandardDrinkInfo
  value: DrinkVolume
  type: 'direct' | 'indirect'
  updateVolume?: (key: string, value: number, isFirst: boolean) => void
}

export default function Drink({ 
  info,
  value,
  type,
  updateVolume
}: props) {
  return (
    <div className='ac-drink-container'>
      <img src={info.icon} alt='drink' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
        <div className='ac-drink-type'>{info.type}</div>
        <div className='ac-drink-subtype'>{info.subType}</div>
        <div className='ac-drink-percent'>
          <span className='ac-drink-percent-number'>{info.percent}</span>%
        </div>
      </div>
      <div className='ac-drink-unit-container'>
        <div style={{ display: 'flex' }}>
          <div className='ac-drink-volume'>
            <span className='ac-drink-volume-span'>
              {info.volumeStr !== undefined ? info.volumeStr : info.volume1 + 'ml'}
            </span>
          </div>
          <DropDown value={value.volume} type={type} suffix={info.unit} min={0} max={20} step={0.5} onValueChange={(value) => {
            if (updateVolume) updateVolume(info.id, value, true)
          }} />
        </div>
        {info.volume2 && value.volume2 !== undefined && (
          <div style={{ display: 'flex' }}>
            <div className='ac-drink-volume'>
              <span className='ac-drink-volume-span'>{info.volume2}ml</span>
            </div>
            <DropDown value={value.volume2} type={type} suffix={info.unit} min={0} max={20} step={0.5} onValueChange={(value) => {
              if (updateVolume) updateVolume(info.id, value, false)
            }} />
          </div>
        )}
      </div>
    </div>
  )
}
