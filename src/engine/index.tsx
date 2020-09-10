import { RANKS_ARRAY } from "const/ranks"
import { DISEASE_RIO } from "const/disease";
import { version } from "react-dom";
import { DiseaseStat } from "types/drinks";

export function calcRank(age: number, alcohol: number, gender: number) {
  function getRankFromRange(idx: number, weights: number[], min: number, range: number, alcohol: number) {
    let beforeSum = 0, totalSum = 0;
    for (let i = 0; i < weights.length; i ++) {
      if (i >= idx) beforeSum += weights[i]
      totalSum += weights[i]
    }
  
    const startRank = beforeSum * 100 / totalSum
    const rankRange = weights[idx] * 100 / totalSum
  
    const detailedRank = startRank - Math.min(alcohol - min, range) / range * rankRange
    return detailedRank === 0 ? 1 : detailedRank
  }
  const ageLevel = Math.floor((age - 20) / 5)
  const drinkLevel = Math.floor(alcohol / 10)
  let rank = 1
  if (drinkLevel <= 2) {
    rank = getRankFromRange(0, RANKS_ARRAY[gender][ageLevel], 0, 30, alcohol)
  } else if (drinkLevel <= 4) {
    rank = getRankFromRange(1, RANKS_ARRAY[gender][ageLevel], 30, 20, alcohol)
  } else if (drinkLevel <= 6) {
    rank = getRankFromRange(2, RANKS_ARRAY[gender][ageLevel], 40, 20, alcohol)
  } else if (drinkLevel <= 9) {
    rank = getRankFromRange(3, RANKS_ARRAY[gender][ageLevel], 60, 30, alcohol)
  } else {
    rank = getRankFromRange(4, RANKS_ARRAY[gender][ageLevel], 100, 30, alcohol)
  }
  return Math.round(rank)
}

export function calcDisease(alcohol: number, gender: number, selectedDisease: number[]) {
  const drinkLevel = Math.floor(alcohol / 10)
  let result = [{
    index: 0,
    stat: DISEASE_RIO[0][drinkLevel] as number
  }, {
    index: 1,
    stat: DISEASE_RIO[1][drinkLevel] as number
  }]
  selectedDisease.map((value) => {
    if (value < 8) {
      const diseaseVal = DISEASE_RIO[value + 2][drinkLevel]
      const stat = typeof(diseaseVal) === 'number' ? diseaseVal : (gender === 0 ? diseaseVal.M : diseaseVal.W)
      result.push({
        index: value + 2,
        stat: stat
      })
    } else if (value === 8) {
      [9, 10, 11, 12, 13, 14, 15].map((v) => {
        result.push({
          index: v,
          stat: DISEASE_RIO[v][drinkLevel] as number
        })
      })
    }
  })
  return result
}

export function nextDisease(alcohol:number, gender: number, orgStat: DiseaseStat[]) {
  const drinkLevel = Math.floor(alcohol / 10)
  let result = []
  for (let i = 0; i < orgStat.length; i++) {
    const newValue = DISEASE_RIO[orgStat[i].index][drinkLevel]
    if (typeof(newValue) === 'number'){
      result.push({
        index: orgStat[i].index,
        stat: newValue as number
      })
    } else {
      result.push({
        index: orgStat[i].index,
        stat: gender === 0 ? newValue.M : newValue.W
      })
    }
  }
  return result
}