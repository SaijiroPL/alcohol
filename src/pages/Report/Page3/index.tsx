import { RootState } from 'store'
import { 
  setDiseaseStat, 
  load as loadR } from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  alcohol: state.question.alcohol,
  daily: state.report.daily,
  gender: state.question.question1,
  rank: state.report.rank,
  diseaseStat: state.report.diseaseStat,
  selectedDisease: state.question.question12,
})

const mapDispatchToProps = { 
  setDiseaseStat, loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)