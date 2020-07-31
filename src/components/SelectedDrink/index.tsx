import React from 'react';
import arrowRight from 'svgs/arrow-right.svg';

import Spinner from 'components/Spinner'
import './styles.css';

interface props {
  icon: string
  type: string
  percent?: number
  volume?: number
  unit?: string
  alcohol: number | string
  alcoholColor: 'green' | 'red'
}

export default function Drink({
  icon,
  type,
  percent,
  volume,
  unit,
  alcohol,
  alcoholColor
}: props) {
  return (
    <div className='ac-selecteddrink-container'>
      <img src={icon} alt='drink' className='ac-selecteddrink-image'/>
      {<span className='ac-selecteddrink-content'>{type} {percent}{percent && '%'}  {volume}{unit}</span>}
      <img src={arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
      <div className='ac-selecteddrink-alcohol-wrapper' style={{ color: alcoholColor === 'green' ? '#376B6D' : '#993333'}}>
        {(typeof(alcohol) === 'number') && (
          <span><span className='ac-selecteddrink-alcohol'>{alcohol}</span>g</span>
        )}
        {typeof(alcohol) === 'string' && (
          <span className='ac-selecteddrink-alcohol'>{alcohol}</span>
        )}
      </div>
    </div>
  )
}
