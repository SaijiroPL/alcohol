import { RootState } from 'store'
import { setFrequency, setNewRank, setDrink, setOtherDrink, initDrinks, initOtherDrinks } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  frequency: state.report.frequency,
  drinks: state.report.drinks,
  otherDrinks: state.report.otherDrinks,
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
  initOtherDrinks
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)