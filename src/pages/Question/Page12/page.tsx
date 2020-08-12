import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import AccordianChoice from 'components/AccordianChoice'
import MultiButton from 'components/MultiButton'
import { DISEASE_INFO } from 'const/disease'
import { PAGE_INFOES } from 'const/selections'

interface props {
  answer: number[]
  setAnswer: (answer: number[]) => void
  setGroup: (group: 'A' | 'B') => void
}

export default function({
  answer,
  setAnswer,
  setGroup
}: props) {
  const history = useHistory();
  const [selected, updateSelected] = useState<number[]>(answer)

  function onNext() {
    history.push("/goal/1");
    Math.random() < 0.5 ? setGroup('A') : setGroup('B')
    setAnswer(selected)
  }
  function onBack() {
    history.push("/question/11");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={12} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[11].title}</div>
      </div>
      <AccordianChoice info={DISEASE_INFO} selected={selected} updateItem={(index) => {
        if (!selected.includes(index))
          updateSelected(prev => [...prev, index])
        else 
          updateSelected(prev => [...(prev.filter(value => value !== index))])
      }}  />
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}