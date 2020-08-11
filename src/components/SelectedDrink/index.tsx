import React from 'react';
import { arrowRight } from 'const/icons';

import Spinner from 'components/Spinner'

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  icon: string
  type: string
  percent?: number
  volume?: number | string
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
      <div className='ac-selecteddrink-alcohol-wrapper' style={{ color: alcoholColor === 'green' ? Colors.GREEN : Colors.RED}}>
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
