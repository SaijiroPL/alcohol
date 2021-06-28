import React, { useState } from 'react'
import { CSVLink } from "react-csv";
import { dataRef } from 'firebase/instance'
import { PAGE_INFOES } from 'const/selections'
import { DRINK_INFO } from 'const/drinks'

export default function() {
  const [csvData, updateCsv] = useState<any[]>([])

  const headers = [
    'datetimeStart',
    'datetimeFinish',
    'allocation',
    'sex',
    'age',
    'AUDIT1_answer',
    'AUDIT1_score',
    'AUDIT2_detail',
    'AUDIT2_ethanolQuantity',
    'AUDIT2_score',
    'AUDIT3_answer',
    'AUDIT3_score',
    'AUDIT4_answer',
    'AUDIT4_score',
    'AUDIT5_answer',
    'AUDIT5_score',
    'AUDIT6_answer',
    'AUDIT6_score',
    'AUDIT7_answer',
    'AUDIT7_score',
    'AUDIT8_answer',
    'AUDIT8_score',
    'AUDIT9_answer',
    'AUDIT9_score',
    'AUDIT10_answer',
    'AUDIT10_score',
    'Q12_高血圧',
    'Q12_逆流性食道炎',
    'Q12_脳梗塞',
    'Q12_認知症',
    'Q12_肝硬変',
    'Q12_肺炎',
    'Q12_膵炎',
    'Q12_がん',
    'Q12_うつ病',
    'GoalFirst_frequency',
    'GoalFirst_detail',
    'GoalFirst_ethanolQuantity',
    'GoalFirst_frequency',
    'GoalFirst_detail',
    'GoalFirst_ethanolQuantity',
    'Reason',
  ]

  function getDrinkItem(key: string) {
    for (let i = 0; i < DRINK_INFO.length; i++) {
      const item = DRINK_INFO[i]
      if (item.id === key) {
        return item
      }
    }
    return DRINK_INFO[0]
  }

  function getDrinkName(key: string) {
    const item = getDrinkItem(key)
    return item.type
  }

  function getDrinkVolume(key: string, obj: any) {
    const item = getDrinkItem(key)
    return obj.volume * item.volume1 + (item.volume2 ? obj.volume2 * item.volume2 : 0)
  }

  function getDrinkValue(obj: any) {
    let drinksValue = ''
    for (let key in obj) {
      const volume = getDrinkVolume(key, obj[key])
      if (volume > 0) {
        drinksValue += `${getDrinkName(key)}:${volume}ml;`
      }
    }
    return drinksValue
  }

  function getOtherDrinkValue(obj: any) {
    if (!obj) return ''
    let drinksValue = ''
    for (let i = 0; i < obj.length; ++i) {
      drinksValue += `その他${obj[i].alcohol}%:${obj[i].volume}ml;`
    }
    return drinksValue
  }

  function getFrequency(val: number) {
    if (val <= 3) {
      return val
    } else {
      return 4 * (val - 3)
    }
  }
  
  dataRef.off()
  dataRef.on('value', (snapshot) => {
    if (csvData.length === 0) {
      const vals = snapshot.val()
      let arr = []
      arr.push(headers)
      
      for(var key in vals){
        const obj = vals[key]

        const drinkLevel = obj.question.alcohol / 10
        let alcoholScore = 0
        if (drinkLevel <= 2) {
          alcoholScore = 0
        } else if (drinkLevel <= 4) {
          alcoholScore = 1
        } else if (drinkLevel <= 6) {
          alcoholScore = 2
        } else if (drinkLevel <= 9) {
          alcoholScore = 3
        } else {
          alcoholScore = 4
        }

        let question12 = obj.question.question12 as number[]
        if (question12 === undefined) question12 = []
        
        const item = [
          obj.question.startDate,
          obj.date,
          obj.report.group,
          obj.report.gender,
          obj.report.age,
          PAGE_INFOES[1].selections[obj.question.question2], PAGE_INFOES[1].scores[obj.question.question2],
          getDrinkValue(obj.question.drinks) + getOtherDrinkValue(obj.question.otherDrinks), obj.question.alcohol, alcoholScore,
          PAGE_INFOES[3].selections[obj.question.question4], PAGE_INFOES[3].scores[obj.question.question4],
          PAGE_INFOES[4].selections[obj.question.question5], PAGE_INFOES[4].scores[obj.question.question5],
          PAGE_INFOES[5].selections[obj.question.question6], PAGE_INFOES[5].scores[obj.question.question6],
          PAGE_INFOES[6].selections[obj.question.question7], PAGE_INFOES[6].scores[obj.question.question7],
          PAGE_INFOES[7].selections[obj.question.question8], PAGE_INFOES[7].scores[obj.question.question8],
          PAGE_INFOES[8].selections[obj.question.question9], PAGE_INFOES[8].scores[obj.question.question9],
          PAGE_INFOES[9].selections[obj.question.question10], PAGE_INFOES[9].scores[obj.question.question10],
          PAGE_INFOES[10].selections[obj.question.question11], PAGE_INFOES[10].scores[obj.question.question11],
          question12.includes(0) ? '1' : '0',
          question12.includes(1) ? '1' : '0',
          question12.includes(2) ? '1' : '0',
          question12.includes(3) ? '1' : '0',
          question12.includes(4) ? '1' : '0',
          question12.includes(5) ? '1' : '0',
          question12.includes(6) ? '1' : '0',
          question12.includes(7) ? '1' : '0',
          question12.includes(8) ? '1' : '0',
          getFrequency(obj.report.frequency), 
          getDrinkValue(obj.report.drinks) + getOtherDrinkValue(obj.report.otherDrinks), 
          obj.report.newAlcohol,
          getFrequency(obj.report.nextFrequency), 
          getDrinkValue(obj.report.nextDrinks) + getOtherDrinkValue(obj.report.nextOtherDrinks),  
          obj.report.nextAlcohol,
          obj.report.will
        ]
        arr.push(item)
      }
      updateCsv(arr)
    }
  })
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      {csvData.length > 0 && (<CSVLink 
        filename={`alcohol-${new Date().getTime()}.csv`} 
        data={csvData}
        asyncOnClick={true}
        onClick={() => {
          return csvData.length > 0
        }}>
          Download Csv Data
      </CSVLink>)}
    </div>
  )
}