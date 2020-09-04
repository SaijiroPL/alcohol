import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import queryString from 'query-string'

import QuestionTitle from 'components/QuestionTitle'
import MultiChoice from 'components/MultiChoice'
import MultiButton from 'components/MultiButton'

import { QuestionProps } from 'types/pages'
import { PAGE_INFOES } from 'const/selections'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'

import './styles.css';
import { useStore } from 'react-redux';
import { RootState } from 'store';

export default function({
  answer,
  setAnswer,
  loadState
}: QuestionProps) {
  const history = useHistory()

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
    if (answer >= 0) {
      const key = saveStore()
      history.push(`/question/3?key=${key}`);
    }
  }
  function onBack() {
    const key = queryString.parse(window.location.search).key?.toString()
    history.push(`/question/1?key=${key}`);
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={2} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[1].title}</div>
      </div>
      <MultiChoice answer={answer} options={PAGE_INFOES[1].selections} elementStyle={{ margin: '10px' }} columns={2} setAnswer={setAnswer} />
      <MultiButton onNext={onNext} onBack={onBack} nonSticky />
    </div>
  )
}