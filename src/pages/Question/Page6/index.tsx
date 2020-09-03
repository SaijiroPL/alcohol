import { RootState } from 'store'
import { setAnswer6, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question6
})

const mapDispatchToProps = { 
  setAnswer: setAnswer6,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)