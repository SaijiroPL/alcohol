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
  orgFrequency: state.report.frequency,
  orgDrinks: state.report.drinks,
  orgOtherDrinks: state.report.otherDrinks,
  frequency: state.report.nextFrequency,
  drinks: state.report.nextDrinks,
  otherDrinks: state.report.nextOtherDrinks,
  rank: state.report.rank,
  newRank: state.report.newRank,
  alcohol: state.question.alcohol,
  newAlcohol: state.report.nextAlcohol,
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