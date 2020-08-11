import { RootState } from 'store'
import { setScore } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  score: state.report.score,
  question: [
    state.question.question2,
    state.question.alcohol,
    state.question.question4,
    state.question.question5,
    state.question.question6,
    state.question.question7,
    state.question.question8,
    state.question.question9,
    state.question.question10,
    state.question.question11,
  ]
})

const mapDispatchToProps = { 
  setScore
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)