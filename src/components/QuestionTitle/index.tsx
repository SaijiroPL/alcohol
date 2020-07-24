import React from 'react';

import './styles.css';

interface props {
  sequence: number
}
export default function({
  sequence
}: props) {
  return (
    <div className='ac-question-title'>
      <div className='ac-question-number'>
        {sequence}
      </div>
      <div className='ac-question-count'>全12問</div>
    </div>
  )
}