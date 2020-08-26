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

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        <div className='ac-question-text'>{PAGE_INFOES[9].title}</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={PAGE_INFOES[9].selections} elementStyle={{ margin: '10px', width: '300px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} nonSticky={true} />
    </div>
  )
}