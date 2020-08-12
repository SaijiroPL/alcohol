import { RootState } from 'store'
import { setAnswer12 } from 'store/question'
import { setGroup } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question12
})

const mapDispatchToProps = { 
  setAnswer: setAnswer12,
  setGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)