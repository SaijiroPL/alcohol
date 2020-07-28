import React from 'react';
import arrowRight from 'svgs/arrow-right.svg';

import Spinner from 'components/Spinner'
import './styles.css';

interface props {
  icon: string
  type: string
  percent: number
  volume: number
  unit: string
  alcohol: number
}

export default function Drink({
  icon,
  type,
  percent,
  volume,
  unit,
  alcohol
}: props) {
  return (
    <div className='ac-selecteddrink-container'>
      <img src={icon} alt='drink' className='ac-selecteddrink-image'/>
      <span className='ac-selecteddrink-content'>{type} {percent}%  {volume}{unit}</span>
      <img src={arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
      <div className='ac-selecteddrink-alcohol-wrapper'>
        <span className='ac-selecteddrink-alcohol'>{alcohol}</span>g
      </div>
    </div>
  )
}
