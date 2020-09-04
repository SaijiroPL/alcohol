import { RootState } from 'store'
import { load as loadQ } from 'store/question'
import { setScore, load as loadR } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  score: state.report.score,
  question0: state.question.question2,
  question1: state.question.alcohol,
  question2: state.question.question4,
  question3: state.question.question5,
  question4: state.question.question6,
  question5: state.question.question7,
  question6: state.question.question8,
  question7: state.question.question9,
  question8: state.question.question10,
  question9: state.question.question11,
})

const mapDispatchToProps = { 
  setScore,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)