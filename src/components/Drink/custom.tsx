import React from 'react';

import Spinner from 'components/Spinner'
import './styles.css';

interface props {
  icon: string
}

export default function Drink({
  icon,
}: props) {
  return (
    <div className='ac-drink-container'>
      <img src={icon} alt='logo' style={{ marginTop: '10px' }}/>
      <div className='ac-drink-name-container'>
        <div className='ac-drink-type'>その他の<br />お酒</div>
      </div>
    
      <Spinner value={9} suffix='%を' />
      <Spinner value={500} suffix='ml' />
    </div>
  )
}
