import { RootState } from 'store'
import { setRank, setDaily, load as loadR } from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  alcohol: state.question.alcohol,
  score: state.report.score,
  rank: state.report.rank,
  daily: state.report.daily,
  gender: state.question.question1,
  age: state.question.age,
  question2: state.question.question2,
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks,
  group: state.report.group
})

const mapDispatchToProps = { 
  setRank,
  setDaily,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)