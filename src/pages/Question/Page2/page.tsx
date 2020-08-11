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
  const history = useHistory()
  function onNext() {
    if (answer >= 0)
      history.push("/question/3");
  }
  function onBack() {
    history.push("/question/1");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={2} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[1].title}</div>
      </div>
      <MultiChoice answer={answer} options={PAGE_INFOES[1].selections} elementStyle={{ margin: '10px' }} columns={2} setAnswer={setAnswer} />
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}