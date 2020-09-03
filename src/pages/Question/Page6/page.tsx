import React from 'react'
import { useHistory } from "react-router-dom";

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import MultiButton from 'components/MultiButton'

import { QuestionProps } from 'types/pages'
import { PAGE_INFOES } from 'const/selections'
import './styles.css';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

export default function({
  answer,
  setAnswer,
  loadState
}: QuestionProps) {
  const history = useHistory();

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
    const key = saveStore()
    history.push(`/question/7?key=${key}`);
  }
  function onBack() {
    const key = queryString.parse(window.location.search).key?.toString()
    history.push(`/question/5?key=${key}`);
  }
  
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={6} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[5].title}</div>
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={PAGE_INFOES[5].selections} elementStyle={{ margin: '10px' }} columns={1}/>
      <MultiButton onNext={onNext} onBack={onBack} nonSticky={true} />
    </div>
  )
}