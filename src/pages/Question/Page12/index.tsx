import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import AccordianChoice from 'components/AccordianChoice'
import MultiButton from 'components/MultiButton'

export default function() {
  const history = useHistory();
  const info = [
    {
      title: '高血圧',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '逆流性食道炎',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '脳梗塞',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '認知症',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '肝硬変',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '肺炎',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: '膵炎',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: 'がん',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    },
    {
      title: 'うつ病',
      description: '慢性的に血圧が高くなる病気。徐々に進行し、脳梗塞や心筋梗塞など深刻な病気のリスクになる。'
    }
  ]
  function onNext() {
    // history.push("/question/12");
  }
  function onBack() {
    history.push("/question/11");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={12} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>ご家族がかかったことがある病気、あなたが心配している病気を選んでください。飲酒量によって病気にかかる可能性がどれくらい変わるかが表示されます。</div>
      </div>
      <AccordianChoice info={info} />
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}