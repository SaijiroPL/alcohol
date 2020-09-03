import React from 'react';

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
        <span className='ac-question-number'>{sequence}</span> <br/>
        <span className='ac-question-plus-text'>{plusText}</span>
      </div>
      <div className='ac-question-count'>全12問</div>
    </div>
  )
}