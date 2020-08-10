import React from 'react';

import Spinner from 'components/Spinner'
import './styles.css';

interface props {
  icon: string
  title: string
  value1: number
  value2: number
}

export default function Drink({
  icon,
  value1,
  value2,
  title
}: props) {
  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-custom-drink-name-container'>
        <div className='ac-drink-type'>{title}</div>
      </div>
      <div>
        <Spinner value={value1} suffix='%を' min={1} max={50} />
      </div>
      
      <Spinner value={value2} suffix='ml' min={50} max={1000} step={50} />
    </div>
  )
}
