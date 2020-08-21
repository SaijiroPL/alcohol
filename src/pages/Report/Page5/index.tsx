import { RootState } from 'store'
import { 
  setNewRank, 
  setNextDrink, 
  setNextOtherDrink,
  setNextFrequency,
  initNextDrinks,
  initNextOtherDrinks
} from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  frequency: state.report.frequency,
  drinks: state.report.drinks,
  otherDrinks: state.report.otherDrinks,
  rank: state.report.rank,
  newRank: state.report.newRank,
  alcohol: state.question.alcohol,
  newAlcohol: state.report.newAlcohol,
  disease: state.report.disease,
  newDisease: state.report.newDisease
})

const mapDispatchToProps = { 
  setDrink: setNextDrink,
  setOtherDrink: setNextOtherDrink,
  setFrequency: setNextFrequency,
  setNewRank,
  initDrinks: initNextDrinks,
  initOtherDrinks: initNextOtherDrinks
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)