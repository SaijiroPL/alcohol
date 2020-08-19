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
    history.push("/question/10");
  }
  function onBack() {
    history.push("/question/8");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={9} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[8].title}</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={PAGE_INFOES[8].selections} elementStyle={{ margin: '10px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} nonSticky={true}/>
    </div>
  )
}