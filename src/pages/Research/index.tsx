import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { studyRef } from 'firebase/instance'

import * as Colors from 'const/colors'
import SingleButton from 'components/SingleButton'

export default function() {
  const history = useHistory();

  const [study, setStudy] = useState<string>('');

  useEffect(() => {
    studyRef.on('value', (snapshot) => {
      setStudy(snapshot.val());
    })
  }, []);
  
  function onNext() {
    history.push('/intro');
  }

  return (
    <div className='research-container'>
      <div className='research-title'>本研究について</div>
      <div className='research-content'>
        {ReactHtmlParser(study)}
      </div>
      <SingleButton onClick={onNext} title='次　へ' color={Colors.GREEN} nonSticky />
    </div>
  )
}