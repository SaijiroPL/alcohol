import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import MultiButton from 'components/MultiButton'

import { QuestionProps } from 'types/pages'
import { PAGE_INFOES } from 'const/selections'

import './styles.css';

export default function({
  answer,
  setAnswer
}: QuestionProps) {
  const history = useHistory();
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
        <div className='ac-question-text'>{PAGE_INFOES[10].title}</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={PAGE_INFOES[10].selections} elementStyle={{ margin: '10px', width: '300px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}