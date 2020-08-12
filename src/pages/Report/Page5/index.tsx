import { RootState } from 'store'
import { 
  setFrequency, 
  setNewDaily, 
  setNewRank, 
  setDrink, 
  setOtherDrink,
  setNewDisease
} from 'store/report'
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
  disease: state.report.disease,
  newDisease: state.report.newDisease
})

const mapDispatchToProps = { 
  setDrink,
  setOtherDrink,
  setFrequency,
  setNewDaily,
  setNewRank,
  setNewDisease
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)