import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import ClipLoader from "react-spinners/ClipLoader";

import SingleButton from 'components/SingleButton'
import { mic, tick } from 'const/icons'
import * as Colors from 'const/colors'

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props {
  will: string
  setWill: (will: string) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  will,
  setWill,
  loadQ, loadR
}: props) {
  const history = useHistory()
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
    history.push(`/goal/7?key=${key}`);
  }

  return (
    <div className='report-page-container'>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      <div style={{ paddingTop: '40px' }}>
        <img src={mic} alt='face' className='face-icon' />
      </div>
      <div className='container-center-text' style={{ fontSize: '16px', marginTop: '25px' }}>
        最後に、あなたがお酒を減らす <br/>
        ための意気込みを聞かせてください！
      </div>
      <div style={{ color: '#993333', fontSize: '20px', fontWeight: 'bold', marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ alignSelf: 'flex-end', marginRight: '5px' }}>私は</span>
          <TextField InputProps={{ className: 'ac-decision-text' }} onChange={(e: any) => {
            setWill(e.target.value)
          }}/>
        </div>
        <div className='container-center-text' style={{ marginTop: '10px' }}>
          ために、お酒を減らします！
        </div>
      </div>
      <div style={{ 
        margin: '20px auto', 
        fontSize: '14px', 
        justifyContent: 'center', 
        width: '240px',
        lineHeight: '1.5rem', 
        letterSpacing: '0.2rem'}}>
          <span>たとえば<br/></span>
          <span><img src={tick} alt='tick' className='tick-icon' />将来の健康のために<br/></span>
          <span><img src={tick} alt='tick' className='tick-icon' />家族に迷惑をかけないために<br/></span>
          <span><img src={tick} alt='tick' className='tick-icon' />お金を貯めるために<br/></span>
          <span><img src={tick} alt='tick' className='tick-icon' />9月に産まれる娘のために<br/></span>
      </div>
      <SingleButton title='レポートを表示する' color={Colors.RED} onClick={onNext} nonSticky={true} />
    </div>
  )
}