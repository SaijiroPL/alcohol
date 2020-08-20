import React, { useState, useRef } from 'react'
import { CSVLink } from "react-csv";
import { dataRef } from 'firebase/instance'

export default function() {
  const [csvData, updateCsv] = useState<any[]>([])
  
  dataRef.off()
  dataRef.on('value', (snapshot) => {
    const vals = snapshot.val()
    let arr = []
    for(var key in vals){
      arr.push(vals[key])
    }
    if (csvData.length === 0) {
      updateCsv(arr)
      console.log('aaa')
    }
  })
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <CSVLink filename={`alcohol-${new Date().getTime()}`} data={csvData}>Download Csv Data</CSVLink>
    </div>
  )
}