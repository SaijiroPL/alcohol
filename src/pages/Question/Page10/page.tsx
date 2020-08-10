import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import MultiButton from 'components/MultiButton'
import { QuestionProps } from 'types/pages'

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
    history.push("/question/11");
  }
  function onBack() {
    history.push("/question/9");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={10} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲酒により、あなた自身や他の人がケガをしたことがありますか？</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={selections} elementStyle={{ margin: '10px', width: '300px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}