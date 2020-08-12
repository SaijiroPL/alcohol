import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

import SingleButton from 'components/SingleButton'
import Disease from 'components/Disease'
import Rank from 'components/Chart/rank'

import * as Colors from 'const/colors'
import { life, ambulance, liver, esophagus, pancreatitis, brain } from 'const/icons'
import { DISEASE_STAT } from 'const/disease'
import './styles.css';

interface props {
  daily: number
  rank: number
  disease: number[]
  setDisease: (disease: number[]) => void
}

export default function({
  daily,
  rank,
  disease,
  setDisease
}: props) {
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    const drinkLevel = Math.floor(daily / 10)
    setDisease([
      DISEASE_STAT[0][drinkLevel],
      DISEASE_STAT[1][drinkLevel],
      DISEASE_STAT[2][drinkLevel],
      DISEASE_STAT[3][drinkLevel],
      DISEASE_STAT[4][drinkLevel],
      DISEASE_STAT[5][drinkLevel],
    ])
  }, [])
  function onNext() {
    history.push("/goal/4");
  }
  return (
    <div className='report-page-container'>
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Disease icon={life} content={disease[0]} unit='倍' title='死亡リスク' />
        <Disease icon={ambulance} content={disease[1]} unit='倍' title='アルコール関連疾患リスク' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Disease icon={liver} content={disease[2]} unit='倍' title='肝臓がんリスク' imgStyle={{ marginTop: '10px' }} />
        <Disease icon={esophagus} content={disease[3]} unit='倍' title='食道がんリスク' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Disease icon={pancreatitis} content={disease[4]} unit='倍' title='膵炎リスク' />
        <Disease icon={brain} content={disease[5]} unit='倍' title='脳卒中リスク' />
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '30px', marginBottom: '20px' }}>
        お酒は人生に関わる病気のリスクを高めます<br/>お酒を減らし、将来の健康を手に入れましょう
      </div>
      <SingleButton title='減酒目標を立てる' color={Colors.RED} nonSticky={true} onClick={onNext} />
    </div>
  )
}