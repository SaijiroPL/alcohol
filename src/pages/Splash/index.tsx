import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { logo } from 'const/icons';
import './styles.css';

export default function Splash() {
  const [isLoaded, updateLoaded] = useState(false)

  const history = useHistory();

  setTimeout(() => {
    updateLoaded(true)
  }, 1000)

  function onNext() {
    if (isLoaded)
      history.push("/question/1");
  }
  return (
    <div className='ac-page-top-container' onClick={onNext}>
      <div className='ac-page-top-above'>
        <img className='ac-top-logo' src={logo} alt='logo'/>
        <span className='ac-top-title'>お酒の飲み方をふりかえる</span>
      </div>
      <div className='ac-page-top-below'>
        {isLoaded && (
          <div className='ac-top-start'>
            飲酒度チェックを<br/>開始
          </div>
        )}
      </div>
    </div>
  )
}