import React, { useState } from 'react';
import logo from 'svgs/top_icon.svg';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Splash() {
  const [isLoaded, updateLoaded] = useState(false)
  setTimeout(() => {
    updateLoaded(true)
  }, 2000)
  return (
    <div className='ac-page-top-container'>
      <div className='ac-page-top-above'>
        <img className='ac-top-logo' src={logo} alt='logo'/>
        <span className='ac-top-title'>お酒の飲み方をふりかえる</span>
      </div>
      <div className='ac-page-top-below'>
        {isLoaded && (
          <Link to='/question'>
            <div className='ac-top-start'>
              飲酒度チェックを<br/>開始
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}