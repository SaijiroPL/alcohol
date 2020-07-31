import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Disease from 'components/Disease'
import MultiButton from 'components/MultiButton'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import Frequency from 'components/Drink/frequency'
import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'

import * as Icons from 'const/icons'
import * as Colors from 'const/colors'

export default function() {
  return (
    <div className='report-page-container' style={{ padding: '30px' }}>
      <div className='font-kans container-center-text' style={{
        color: '#993333',
        fontSize: '20px',
      }}>
        お酒の飲み方を振り返る
      </div>
      <div className='font-kans container-center-text' style={{
        color: 'black',
        fontSize: '14px',
        paddingTop: '5px'
      }}>
        2020年4月19日
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '4' }}>
          <Button 
            style={{
              backgroundColor: '#993333', 
              color: 'white', 
              borderRadius: 20,
              padding: '3px 10px',
              marginTop: '30px'
            }}>
              飲酒度チェック
          </Button>
          <div style={{ color: '#993333', marginTop: '24px', display: 'flex' }}>
            <img src={Icons.faceIcon} alt='face' style={{ width: '50px',height: '50px', marginRight: '7px' }} />
            <span className='font-hira' style={{ fontSize: '45px' }} >19</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '5px' }}>点</span>
          </div>
        </div>
        <div style={{ flex: '6', marginLeft: '10px' }}>
          <p style={{ fontSize: '16px', color: '#993333' }}>危険度の高い飲酒群</p>
          <p style={{ fontSize: '14px' }}>アルコールが原因ですでに <br/>大きな危害を体験しています</p>
          <p style={{ fontSize: '16px', color: '#993333' }}>特に問題となる要素</p>
          <p style={{ fontSize: '14px' }}>
            ✓   記憶の欠損 <br/>
            ✓   仕事への悪影響 <br/>
            ✓   朝の迎え酒 <br/>
            ✓   周囲の心配 <br/>
          </p>
        </div>
      </div>
      <div>
        <Button 
          style={{
            backgroundColor: '#993333', 
            color: 'white', 
            borderRadius: 20,
            padding: '3px 10px',
            marginTop: '30px'
          }}>
            現在の飲酒量
        </Button>
        <div 
          className='container-center-text' 
          style={{ 
            marginTop: '10px', 
            fontSize: '16px', 
            color: '#993333'
          }}>
          30 - 39歳の日本人男性で
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Rank rank={30} style={{
            radius: 62,
            fontSizeUp: '65px',
            fontSizeDown: '18px'
          }}/>
        </div>
        <div className='container-center-text' style={{
          fontSize: '18px',
          marginTop: '15px',
        }}>
          <span className='report1-static-label'>死亡リスクの上昇する飲酒量</span>
        </div>
        <Chart rank={30} volume={55} />
        <div className='ac-drinks-container'>
          <SelectedDrink icon={Icons.calendar} type='飲酒頻度' alcohol='1週に4日' alcoholColor='red' />
          <SelectedDrink icon={Icons.beerLight} type='ビール' percent={5} volume={1500} unit='ml' alcohol={60} alcoholColor='red' />
          <SelectedDrink icon={Icons.extra} type='その他のお酒' percent={9} volume={500} unit='ml' alcohol={36} alcoholColor='red' />
        </div>
      </div>
      <div>
        <Button 
          style={{
            backgroundColor: Colors.RED, 
            color: 'white', 
            borderRadius: 20,
            padding: '3px 10px',
            marginTop: '30px'
          }}>
            これからの飲酒目標
        </Button>
        <div 
          className='container-center-text' 
          style={{ 
            marginTop: '10px', 
            fontSize: '16px', 
            color: Colors.BLACK
          }}>
          30 - 39歳の日本人男性で
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Rank rank={94} style={{
            radius: 62,
            fontSizeUp: '65px',
            fontSizeDown: '18px'
          }}/>
        </div>
        <div className='container-center-text' style={{
          color: Colors.BLACK,
          fontSize: '18px',
          marginTop: '15px',
        }}>
          <span style={{ borderBottom: 'solid 2px ' + Colors.BLACK }}>
            節度ある飲酒量！
          </span> <br/>
          <span>
            を目指します
          </span>
        </div>
        <Chart rank={30} volume={55} />
        <div className='ac-drinks-container'>
          <SelectedDrink icon={Icons.calendar} type='飲酒頻度' alcohol='1週に4日' alcoholColor='red' />
          <SelectedDrink icon={Icons.beerLight} type='ビール' percent={5} volume={1500} unit='ml' alcohol={60} alcoholColor='red' />
          <SelectedDrink icon={Icons.extra} type='その他のお酒' percent={9} volume={500} unit='ml' alcohol={36} alcoholColor='red' />
        </div>
      </div>
      <div>
        <Button 
          style={{
            backgroundColor: '#993333', 
            color: 'white', 
            borderRadius: 20,
            padding: '3px 10px',
            marginTop: '30px'
          }}>
            減酒による効果
        </Button>
        <div className='container-center-text' style={{ marginTop: '20px', fontSize: '14px' }}>
          目標の飲酒量を続けることで、これだけの <br/>病気のリスク低下に繋がります
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div>
            <Disease icon={Icons.life} content={-50} unit='%' title='死亡リスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
          <div>
            <Disease icon={Icons.ambulance} content={-38} unit='%' title='アルコール関連疾患リスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div>
            <Disease icon={Icons.liver} content={-50} unit='%' title='肝臓がんリスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
          <div>
            <Disease icon={Icons.esophagus} content={-69} unit='%' title='食道がんリスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <div>
            <Disease icon={Icons.pancreatitis} content={-47} unit='%' title='膵炎リスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
          <div>
            <Disease icon={Icons.brain} content={-46} unit='%' title='脳卒中リスク' titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              1.2倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              1.1倍
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container-center-text'>
          <Button 
            style={{
              backgroundColor: '#993333', 
              color: 'white', 
              borderRadius: 20,
              padding: '3px 10px',
              marginTop: '30px'
            }}>
              減酒への意気込み
          </Button>
          <div style={{ color: '#993333', marginTop: '16px', fontWeight: 'bold', lineHeight: '30px' }}>
            <span style={{ fontSize: '16px' }}>私は、</span> <br/>
            <span style={{ fontSize: '22px' }}>家族に迷惑をかけないために</span> <br/>
            <span style={{ fontSize: '16px' }}>お酒を減らします！</span> <br/>
          </div>
        </div>
        <div className='container-center-text' style={{ fontSize: '16px', lineHeight: '30px', marginBottom: '20px' }}>
          がんばってください！
        </div>
      </div>
      <SingleButton title='保存しないで終了する' color={Colors.RED} nonSticky={true} />
      <SingleButton title='レポートを保存する' color={Colors.WHITE} nonSticky={true} textColor={Colors.PALEGREEN} />
    </div>
  )
}