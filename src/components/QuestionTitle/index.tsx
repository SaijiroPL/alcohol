import React from 'react';
import cn from 'classnames'

import './styles.css';

interface props {
  sequence: number
  plusText?: string
}
export default function({
  sequence,
  plusText
}: props) {
  return (
    <div className='ac-question-title'>
      <div className='ac-question-number-container'>
        <span className={cn('ac-question-number', 'font-fira')}>{sequence}</span> <br/>
        <span className='ac-question-plus-text'>{plusText}</span>
      </div>
      <div className={cn('ac-question-count', 'font-kans')}>全12問</div>
    </div>
  )
}