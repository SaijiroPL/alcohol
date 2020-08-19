import React, { useEffect, useState } from 'react';

import DropDown from 'components/DropDown'
import './styles.css';

interface props {
  icon: string
  title: string
  value1: number
  value2: number
  updateDrink?: (percent: number, volume: number) => void
}

export default function Drink({
  icon,
  value1,
  value2,
  title,
  updateDrink
}: props) {
  const [percent, setPercent] = useState(value1)
  const [volume, setVolume] = useState(value2)

  useEffect(() => {
    if (updateDrink) updateDrink(percent, volume)
  }, [percent, volume, updateDrink])

  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-custom-drink-name-container'>
        <div className='ac-drink-type'>{title}</div>
      </div>
      <div>
        <DropDown value={percent} suffix='%を' min={1} max={50} onValueChange={setPercent}/>
      </div>
      
      <DropDown value={volume} suffix='ml' min={50} max={1000} step={50} onValueChange={setVolume} />
    </div>
  )
}
