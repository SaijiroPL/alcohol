import { RootState } from 'store'
import { setScore } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer1: state.question.question1,
  score: state.report.score
})

const mapDispatchToProps = { 
  setScore
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)