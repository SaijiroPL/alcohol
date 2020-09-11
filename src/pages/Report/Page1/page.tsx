import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import SingleButton from 'components/SingleButton'

import { PAGE_INFOES } from 'const/selections'
import { face, tick } from 'const/icons'
import * as Colors from 'const/colors'
import './styles.css';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props {
  question0: number,
  question1: number,
  question2: number,
  question3: number,
  question4: number,
  question5: number,
  question6: number,
  question7: number,
  question8: number,
  question9: number,
  score: number
  setScore: (score: number) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  question0, question1, question2,
  question3, question4, question5,
  question6, question7, question8, question9,
  score,
  setScore,
  loadQ, loadR
}: props) {
  const history = useHistory();
  const [loading, loaded] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const key = queryString.parse(window.location.search).key?.toString()
    if (key) {
      const ref = loadStateFromFirebase(key)
      ref.on('value', (snapshot) => {
        loadQ(snapshot.val().question)
        loadR(snapshot.val().report)
        loaded(false)
      })
    }
  }, [])

  useEffect(() => {
    let scoreSum = 0;
    const question = [
      question0, question1, question2,
      question3, question4, question5,
      question6, question7, question8, question9
    ]
    for (let i = 0; i < question.length; ++i) {
      if (i !== 1) {
        scoreSum += PAGE_INFOES[i + 1].scores[question[i]]
      } else {
        const drinkLevel = question[i] / 10
        if (drinkLevel <= 2) {
          scoreSum += 0
        } else if (drinkLevel <= 4) {
          scoreSum += 1
        } else if (drinkLevel <= 6) {
          scoreSum += 2
        } else if (drinkLevel <= 9) {
          scoreSum += 3
        } else {
          scoreSum += 4
        }
      }
    }
    setScore(scoreSum)

    console.log(question)
  }, [question0, question1, question2,
    question3, question4, question5,
    question6, question7, question8, question9, setScore])

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

  const scoreLevel = useMemo(() => {
    if (score >= 8 && score < 15) {
      return 1
    } else if (score >= 15 && score < 20) {
      return 2
    } else if (score >= 20) {
      return 3
    }
    return 0
  }, [score])

  function onNext() {
    const key = saveStore()
    history.push(`/goal/2?key=${key}`);
  }
  return (
    <div className='report-page-container'>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      <div className='report-title'>
        <span>おつかれさまでした!</span> <br/>
        <span>あなたの得点は</span>
      </div>
      <div className='face-icon-container'>
        <img src={face[scoreLevel]} alt='face' className='face-icon'/>
      </div>
      <div className='report1-rank-container'>
        <span className='font-fira' style={{ fontSize: '80px' }} >{score}</span>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>点</span>
      </div>
      <div className='container-center-text' style={{ fontSize: '24px' }}>
        <span className='report1-static-label'>
          {scoreLevel === 1 && ('問題のある飲酒群')}
          {scoreLevel === 2 && score < 20 && ('危険な飲酒群')}
          {scoreLevel === 3 && ('アルコール依存症疑い群')}
        </span>
      </div>
      <div className='container-center-text' style={{ marginTop: '15px', fontSize: '14px' }}>
        アルコールが原因で <br/>
        すでに大きな危害を体験しています
      </div>
      <div 
        className='container-center-text' 
        style={{ 
          marginTop: '33px', 
          fontSize: '16px', 
          letterSpacing: '0.3rem',
          color: '#993333'
        }}>
        特に問題となるのは
      </div>
      <div style={{ 
        margin: '20px auto', 
        fontSize: '14px', 
        justifyContent: 'center', 
        width: '180px',
        lineHeight: '1.5rem', 
        letterSpacing: '0.2rem'}}>
          {(question0 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />1日あたりの飲酒量<br/></span>)}
          {(question1 / 10 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />飲酒頻度<br/></span>)}
          {(question2 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />飲酒のコントロール<br/></span>)}
          {(question3 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />仕事や生活への影響<br/></span>)}
          {(question4 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />朝の迎え酒<br/></span>)}
          {(question5 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />罪悪感<br/></span>)}
          {(question6 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />記憶の欠損<br/></span>)}
          {(question7 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />自身や周囲の怪我<br/></span>)}
          {(question8 > 0) && (<span><img src={tick} alt='tick' className='tick-icon' />周囲の心配<br/></span>)}
      </div>
      <SingleButton title='あなたの飲酒量は？' color={Colors.RED} onClick={onNext} nonSticky={true} />
    </div>
  )
}