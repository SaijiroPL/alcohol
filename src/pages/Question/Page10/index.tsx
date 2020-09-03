import { RootState } from 'store'
import { setAnswer10, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question10
})

const mapDispatchToProps = { 
  setAnswer: setAnswer10,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)