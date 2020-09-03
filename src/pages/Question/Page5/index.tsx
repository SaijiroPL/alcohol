import { RootState } from 'store'
import { setAnswer5, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question5
})

const mapDispatchToProps = { 
  setAnswer: setAnswer5,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)