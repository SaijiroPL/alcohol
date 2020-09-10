import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import AccordianChoice from 'components/AccordianChoice'
import MultiButton from 'components/MultiButton'
import { DISEASE_INFO } from 'const/disease'
import { PAGE_INFOES } from 'const/selections'

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props {
  age: number
  gender: number
  answer: number[]
  setAge: (answer: number) => void
  setGender: (answer: number) => void
  setAnswer: (answer: number[]) => void
  setGroup: (group: 'A' | 'B') => void
  loadState: (payload: any) => void
}

export default function({
  age,
  answer,
  gender,
  setAge,
  setAnswer,
  setGroup,
  setGender,
  loadState
}: props) {
  const history = useHistory();
  const [selected, updateSelected] = useState<number[]>(answer)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    const key = queryString.parse(window.location.search).key?.toString()
    if (key) {
      const ref = loadStateFromFirebase(key)
      ref.on('value', (snapshot) => {
        loadState(snapshot.val().question)
      })
    }
  }, [])

  React.useEffect(() => {
    updateSelected(answer)
  }, [answer])

  const store = useStore()
  function saveStore() {
    const key = queryString.parse(window.location.search).key?.toString()
    const state: RootState = store.getState()
    if (key) 
      saveStateToFirebase({
        question: state.question,
        report: state.report,
      }, key)
    return key
  }

  function onNext() {
    Math.random() < 0.5 ? setGroup('A') : setGroup('B')
    setAnswer(selected)
    setAge(age)
    setGender(gender)
    const key = saveStore()
    history.push(`/goal/1?key=${key}`);
  }
  function onBack() {
    const key = queryString.parse(window.location.search).key?.toString()
    history.push(`/question/11?key=${key}`);
  }

  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={12} plusText='最後の質問' />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[11].title}</div>
      </div>
      <AccordianChoice info={DISEASE_INFO} selected={selected} updateItem={(index) => {
        if (!selected.includes(index))
          updateSelected(prev => [...prev, index])
        else 
          updateSelected(prev => [...(prev.filter(value => value !== index))])
      }} />
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} okayText='完　了' />
    </div>
  )
}