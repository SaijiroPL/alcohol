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
    'あるが、1年以上前',
    '1年1内にある',
  ]
  function onNext() {
    history.push("/question/12");
  }
  function onBack() {
    history.push("/question/10");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={11} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>親類、友人、医師などが、あなたの飲酒について心配をしたり、飲酒を控えるようにと薦めてきたことはありますか？</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={selections} elementStyle={{ margin: '10px', width: '300px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}