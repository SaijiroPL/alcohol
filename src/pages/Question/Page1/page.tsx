import React from 'react'
import { useHistory } from "react-router-dom"
 
import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import Spinner from 'components/Spinner'
import SingleButton from 'components/SingleButton'

import * as Colors from 'const/colors'
import { QuestionProps } from 'types/pages'
import { PAGE_INFOES } from 'const/selections'

import './styles.css';

interface props extends QuestionProps {
  age: number
  setAge: (age: number) => void
  setReportAge: (age: number) => void
  setGender: (age: number) => void
}

export default function({
  age,
  answer,
  setAge,
  setAnswer,
  setReportAge,
  setGender
}: props) {
  const history = useHistory();
  function onNext() {
    if (answer >= 0)
      history.push("/question/2");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={1} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[0].title}</div>
      </div>
      <MultiChoice 
        answer={answer}
        options={['男性', '女性']} 
        elementStyle={{ margin: '20px' }} 
        columns={1}
        setAnswer={(index) => {
          setAnswer(index)
          setGender(index)
        }}/>
      <div>
        <Spinner value={age} suffix='歳' min={20} max={100} onValueChange={(value) => {
          setAge(value)
          setReportAge(value)
        }} />
      </div>
      <SingleButton onClick={onNext} title='次　へ' color={Colors.GREEN} />
    </div>
  )
}