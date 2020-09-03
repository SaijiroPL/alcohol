import { RootState } from 'store'
import { setAnswer11, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question11
})

const mapDispatchToProps = { 
  setAnswer: setAnswer11,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)