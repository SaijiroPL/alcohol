import React, { useState, useEffect } from 'react';

import CycleSpinner from 'components/CycleSpinner'
import DropDown from 'components/DropDown'

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  icon: string
  title: string
  value1: '週' | '月'
  value2: number,
  updateValue: (frequency: number) => void
}

export default function Frequency({
  icon,
  value1,
  value2,
  title,
  updateValue
}: props) {
  const [cycle, updateCycle] = useState<'週' | '月'>(value1);
  const [freq, updateFreq] = useState(value2)

  useEffect(() => {
    if (cycle === '月') {
      updateValue(Math.min(freq, 3))
    } else {
      updateValue(freq + 3)
    }
  }, [cycle, freq])

  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
        <div className='ac-drink-type'>{title}</div>
      </div>
    
      <CycleSpinner 
        value={cycle} 
        suffix='に' 
        suffixStyle={{ fontSize: '18px', fontWeight: 'bold', color: Colors.RED }} 
        onValueChange={updateCycle} />
      <DropDown 
        value={freq} 
        suffix='日' 
        suffixStyle={{ fontSize: '18px', fontWeight: 'bold', color: Colors.RED }} 
        onValueChange={updateFreq} 
        max={cycle === '月' ? 3 : 7}
        min={0}/>
    </div>
  )
}
