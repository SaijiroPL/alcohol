import { RootState } from 'store'
import { setAnswer2, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question2
})

const mapDispatchToProps = { 
  setAnswer: setAnswer2,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)