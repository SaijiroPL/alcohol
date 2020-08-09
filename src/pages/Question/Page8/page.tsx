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
    history.push("/question/9");
  }
  function onBack() {
    history.push("/question/7");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={8} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲酒後に罪悪感・後ろめたさを感じたり、後悔をしたことが、過去1年でどれくらいの頻度ありますか？</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={selections} elementStyle={{ margin: '10px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} />
    </div>
  )
}