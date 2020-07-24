import React from 'react'

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import Spinner from 'components/Spinner'
import SingleButton from 'components/SingleButton'
import './styles.css';

export default function Question() {
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={1} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>あなたの年齢、性別を入力してください</div>
      </div>
      <MultiChoice />
      <div style={{alignItems: 'center'}}><Spinner value={20} /></div>
      <SingleButton />
    </div>
  )
}