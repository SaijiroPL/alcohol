import React from 'react'
import TextField from '@material-ui/core/TextField';

import SingleButton from 'components/SingleButton'
import { mic } from 'const/icons'
import * as Colors from 'const/colors'

export default function() {
  return (
    <div className='report-page-container'>
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
          <TextField InputProps={{ className: 'ac-decision-text' }} />
        </div>
        <div className='container-center-text' style={{ marginTop: '10px' }}>
          ために、お酒を減らします！
        </div>
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px'}}>
        <span style={{ display: 'block', margin: '0 auto', width: '200px', lineHeight: '2rem' }}>
          たとえば <br/>
          ✓ 将来の健康のために <br/>
          ✓ 家族に迷惑をかけないために <br/>
          ✓ お金を貯めるために <br/>
          ✓ 9月に産まれる娘のために <br/>
        </span>
      </div>
      <SingleButton title='レポートを表示する' color={Colors.RED} />
    </div>
  )
}