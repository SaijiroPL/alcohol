import { RootState } from 'store'
import { 
  setNewRank, 
  setNextDrink, 
  setNextOtherDrink,
  setNextFrequency,
  initNextDrinks,
  initNextOtherDrinks,
  load as loadR
} from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  frequency: state.report.frequency,
  drinks: state.report.drinks,
  otherDrinks: state.report.otherDrinks,
  rank: state.report.rank,
  newRank: state.report.newRank,
  alcohol: state.question.alcohol,
  newAlcohol: state.report.nextAlcohol,
  disease: state.report.disease,
  newDisease: state.report.newDisease,
  diseaseStat: state.report.diseaseStat,
  newDiseaseStat: state.report.newDiseaseStat,
})

const mapDispatchToProps = { 
  setDrink: setNextDrink,
  setOtherDrink: setNextOtherDrink,
  setFrequency: setNextFrequency,
  setNewRank,
  initDrinks: initNextDrinks,
  initOtherDrinks: initNextOtherDrinks,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)