import { RootState } from 'store'
import { 
  setFrequency, 
  setNewRank, 
  setDrink, 
  setOtherDrink, 
  initDrinks, 
  initOtherDrinks, 
  load as loadR
} from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  frequency: state.question.question2,
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks,
  rank: state.report.rank,
  newRank: state.report.newRank,
  daily: state.report.daily,
  newDaily: state.report.newDaily,
  alcohol: state.question.alcohol,
  newAlcohol: state.report.newAlcohol,
  group: state.report.group
})

const mapDispatchToProps = { 
  setDrink,
  setOtherDrink,
  setFrequency,
  setNewRank,
  initDrinks,
  initOtherDrinks,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)