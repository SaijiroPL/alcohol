import React from 'react';

import CycleSpinner from 'components/CycleSpinner'
import Spinner from 'components/Spinner'

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  icon: string
  title: string
  value1: '週' | '月'
  value2: number
}

export default function Frequency({
  icon,
  value1,
  value2,
  title
}: props) {
  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
      <div className='ac-drink-type'>{title}</div>
      </div>
    
      <CycleSpinner value={value1} suffix='に' suffixStyle={{ fontSize: '18px', fontWeight: 'bold', color: Colors.RED }} />
      <Spinner value={value2} suffix='日' suffixStyle={{ fontSize: '18px', fontWeight: 'bold', color: Colors.RED }} />
    </div>
  )
}
