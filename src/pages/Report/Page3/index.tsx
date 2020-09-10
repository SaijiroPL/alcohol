import { RootState } from 'store'
import { 
  initDrinks, 
  initOtherDrinks, 
  setFrequency,
  setDiseaseStat, 
  load as loadR } from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  alcohol: state.question.alcohol,
  gender: state.question.question1,
  rank: state.report.rank,
  diseaseStat: state.report.diseaseStat,
  selectedDisease: state.question.question12,
  frequency: state.question.question2,
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks,
})

const mapDispatchToProps = { 
  initDrinks, initOtherDrinks, setFrequency,
  setDiseaseStat, loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)