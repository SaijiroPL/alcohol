import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import MultiButton from 'components/MultiButton'

import { QuestionProps } from 'types/types'

import './styles.css';

export default function({
  answer,
  setAnswer
}: QuestionProps) {
  const history = useHistory();
  const selections = [
    'なし',
    '月1回未満',
    '毎月',
    '毎週',
    'ほぼ毎日',
  ]
  function onNext() {
    history.push("/question/8");
  }
  function onBack() {
    history.push("/question/6");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={7} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲み過ぎた翌朝、アルコールを入れないと動けなかった、ということは過去1年でどれくらいありましたか？</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={selections} elementStyle={{ margin: '10px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}