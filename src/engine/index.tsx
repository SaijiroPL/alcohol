import { RANKS_ARRAY } from "const/ranks"
import { DISEASE_RIO, DISEASE_RIO_MAX } from "const/disease";
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
    return Math.round(detailedRank) === 0 ? 1 : Math.round(detailedRank)
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
  return rank
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
  selectedDisease.forEach((value) => {
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
  
  return result.map((item) => {
    if (item.stat === 10000) {
      const diseaseVal = DISEASE_RIO_MAX[item.index];
      const maxVal = typeof(diseaseVal) === 'number' ? diseaseVal : (gender === 0 ? diseaseVal.M : diseaseVal.W)
      return {
        index: item.index,
        stat: maxVal,
        over: true,
      }
    } else {
      return {
        ...item,
        over: false,
      };
    }
  });
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
  return result.map((item) => {
    if (item.stat === 10000) {
      const diseaseVal = DISEASE_RIO_MAX[item.index];
      const maxVal = typeof(diseaseVal) === 'number' ? diseaseVal : (gender === 0 ? diseaseVal.M : diseaseVal.W)
      return {
        index: item.index,
        stat: maxVal,
        over: true,
      }
    } else {
      return {
        ...item,
        over: false,
      };
    }
  });
}

export function reducePercent(index: number, diseaseStat: DiseaseStat[], newDiseaseStat: DiseaseStat[]) {
  const orgStat = Math.round(diseaseStat[index].stat * 10) / 10
  const newStat = Math.round(newDiseaseStat[index].stat * 10) / 10
  const percent = Math.round((orgStat - newStat) / (orgStat - 1) * 100)
  if (orgStat === newStat) return 0
  if (orgStat === 1) return 'ND'
  return percent
}