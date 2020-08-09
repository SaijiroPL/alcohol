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
  const history = useHistory()
  const selections = [
    '飲まない',
    '1か月に1回以下',
    '1か月に2回',
    '1か月に3回',
    '1週に1回',
    '1週に2回',
    '1週に3回',
    '1週に4回',
    '1週に5回',
    '1週に6回',
    '毎日',
  ]
  function onNext() {
    history.push("/question/3");
  }
  function onBack() {
    history.push("/question/1");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={2} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>あなたの年齢、性別を入力してください</div>
      </div>
      <MultiChoice answer={answer} options={selections} elementStyle={{ margin: '10px' }} columns={2} setAnswer={setAnswer} />
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}