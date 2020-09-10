import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import SingleButton from 'components/SingleButton'
import Disease from 'components/Disease'
import Rank from 'components/Chart/rank'

import * as Colors from 'const/colors'
import { life, ambulance, liver, esophagus, pancreatitis, brain } from 'const/icons'
import { DISEASE_STAT, DISEASE_UI } from 'const/disease'
import './styles.css';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';
import { calcDisease } from 'engine';
import { DiseaseStat, DrinkVolume, OtherDrink } from 'types/drinks';

interface props {
  alcohol: number
  gender: number
  frequency: number
  rank: number
  selectedDisease: number[]
  diseaseStat: DiseaseStat[]
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  initDrinks: (drinks: any) => void
  initOtherDrinks: (drinks: any) => void
  setFrequency: (frequency: number) => void
  setDiseaseStat: (disease: DiseaseStat[]) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  alcohol,
  frequency,
  gender,
  rank,
  selectedDisease,
  diseaseStat,
  drinks, otherDrinks,
  initDrinks, initOtherDrinks, setFrequency,
  setDiseaseStat,
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
    setDiseaseStat(calcDisease(alcohol, gender, selectedDisease))
  }, [alcohol, gender, selectedDisease, setDiseaseStat])

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
    setFrequency(frequency)
    initDrinks(drinks)
    initOtherDrinks(otherDrinks)
    const key = saveStore()
    history.push(`/goal/4?key=${key}`);
  }
  function roundDisease(org: number) {
    return Math.round(org * 10) / 10
  }
  function renderStats() {
    let rows = []
    for (let i = 0; i < diseaseStat.length / 2; i++) {
      rows.push(
        (<div key={i} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Disease 
            icon={DISEASE_UI[diseaseStat[i * 2].index].icon} 
            content={roundDisease(diseaseStat[i * 2].stat)} 
            unit='倍' 
            title={`${DISEASE_UI[diseaseStat[i * 2].index].name}リスク`} />
          {(i * 2 + 1 < diseaseStat.length) && 
            <Disease 
              icon={DISEASE_UI[diseaseStat[i * 2 + 1].index].icon} 
              content={roundDisease(diseaseStat[i * 2 + 1].stat)} 
              unit='倍' 
              title={`${DISEASE_UI[diseaseStat[i * 2 + 1].index].name}リスク`} />}
        </div>)
      )
    }
    return rows
  }

  return (
    <div className='report-page-container'>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Rank rank={rank} style={{
          radius: 62,
          fontSizeUp: '65px',
          fontSizeDown: '18px'
        }}/>
      </div>
      <div className='container-center-text' style={{ fontSize: '18px', marginTop: '20px' }}>
        の病気のリスク
      </div>
      <div className='container-center-text' style={{ fontSize: '12px' }}>
        お酒を飲まない人との比較
      </div>
      {renderStats()}
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '30px', marginBottom: '20px' }}>
        お酒は人生に関わる病気のリスクを高めます<br/>お酒を減らし、将来の健康を手に入れましょう
      </div>
      <SingleButton title='減酒目標を立てる' color={Colors.RED} nonSticky={true} onClick={onNext} />
    </div>
  )
}