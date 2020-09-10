import { RootState } from 'store'
import { 
  setNewRank, 
  setDrink, 
  setOtherDrink, 
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
  newAlcohol: state.report.newAlcohol,
  group: state.report.group
})

const mapDispatchToProps = { 
  setDrink,
  setOtherDrink,
  setNextFrequency,
  setNewRank,
  initNextDrinks,
  initNextOtherDrinks,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)