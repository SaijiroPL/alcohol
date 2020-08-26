import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import QuestionTitle from 'components/QuestionTitle'
import AccordianChoice from 'components/AccordianChoice'
import MultiButton from 'components/MultiButton'
import { DISEASE_INFO } from 'const/disease'
import { PAGE_INFOES } from 'const/selections'
import { arrowUp, arrowDown } from 'const/icons'

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
  const [descShow, updateDescShow] = useState<boolean>(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function onNext() {
    history.push("/goal/1");
    // Math.random() < 0.5 ? setGroup('A') : setGroup('B')
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
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button style={{
            backgroundColor: '#AAAAAA', 
            color: 'white', 
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            width: '200px'
          }} onClick={() => updateDescShow(prev => !prev)}>
            病気の説明を表示する
            <img src={descShow ? arrowUp : arrowDown} alt='describe' className='ac-accordian-arrow'/>
        </Button>        
      </div>
      <AccordianChoice info={DISEASE_INFO} selected={selected} updateItem={(index) => {
        if (!selected.includes(index))
          updateSelected(prev => [...prev, index])
        else 
          updateSelected(prev => [...(prev.filter(value => value !== index))])
      }} expanded={descShow} />
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}