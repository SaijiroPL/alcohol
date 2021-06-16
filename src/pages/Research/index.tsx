import React from 'react'
import { useHistory } from "react-router-dom";

import * as Colors from 'const/colors'
import SingleButton from 'components/SingleButton'

export default function() {
  const history = useHistory();
  
  function onNext() {
    history.push('/intro');
  }

  return (
    <div className='research-container'>
      <div className='research-title'>本研究について</div>
      <div className='research-content'>
        研究説明文書が入ります。
      </div>
      <SingleButton onClick={onNext} title='次　へ' color={Colors.GREEN} nonSticky />
    </div>
  )
}