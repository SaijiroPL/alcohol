import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import Spinner from 'components/Spinner'
import SingleButton from 'components/SingleButton'
import './styles.css';

export default function() {
  const history = useHistory();
  function onNext() {
    history.push("/question/2");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={1} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>あなたの年齢、性別を入力してください</div>
      </div>
      <MultiChoice options={['男性', '女性']} elementStyle={{ margin: '20px' }} />
      <Spinner value={20} suffix='歳' />
      <SingleButton onClick={onNext} />
    </div>
  )
}